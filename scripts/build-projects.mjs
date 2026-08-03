import { execFile } from 'node:child_process'
import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'
import { parse as parseToml } from 'smol-toml'
import { compareProjects, latestTag, metaSchema, parseStarFile, slugify } from '../src/data/projectSchema.ts'

const OWNER = process.env.PROJECTS_GITHUB_OWNER ?? 'CodeByDylan'
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.PROJECTS_GITHUB_TOKEN
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BANNER_DIR = join(ROOT, 'public', 'images', 'projects')
const OUT_FILE = join(ROOT, 'src', 'data', 'projects.generated.json')

const run = promisify(execFile)

class BuildError extends Error {}

async function api(path, { raw = false } = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: raw ? 'application/vnd.github.raw' : 'application/vnd.github+json',
      'User-Agent': 'dylandebeer-web-build',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  })
  if (res.status === 404) return null
  if (!res.ok) {
    const hint =
      res.status === 403 && res.headers.get('x-ratelimit-remaining') === '0'
        ? ' (rate limit exhausted — set GITHUB_TOKEN)'
        : ''
    throw new BuildError(`GitHub ${res.status} for ${path}${hint}`)
  }
  return raw ? res.text() : res.json()
}

/** `has_wiki` is on by default and says nothing about content; only a real wiki repo resolves. */
async function hasWiki(repo) {
  try {
    const { stdout } = await run('git', [
      'ls-remote',
      `https://github.com/${OWNER}/${repo}.wiki.git`,
    ])
    return stdout.trim().length > 0
  } catch {
    return false
  }
}

async function packageVersion({ registry, id }) {
  try {
    if (registry === 'nuget') {
      const res = await fetch(
        `https://api.nuget.org/v3-flatcontainer/${id.toLowerCase()}/index.json`,
      )
      if (!res.ok) return undefined
      const { versions } = await res.json()
      return versions?.at(-1)
    }
    const [group, artifact] = id.split(':')
    if (!group || !artifact) return undefined
    // maven-metadata.xml, not search.maven.org — the search index reports 0 results
    // for artifacts that are demonstrably published.
    const res = await fetch(
      `https://repo1.maven.org/maven2/${group.replaceAll('.', '/')}/${artifact}/maven-metadata.xml`,
    )
    if (!res.ok) return undefined
    const xml = await res.text()
    return /<release>([^<]+)<\/release>/.exec(xml)?.[1] ?? /<latest>([^<]+)<\/latest>/.exec(xml)?.[1]
  } catch {
    return undefined
  }
}

async function downloadBanner(slug, sources) {
  for (const { url, isFallback } of sources) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'dylandebeer-web-build' } })
      if (!res.ok) continue
      const type = res.headers.get('content-type') ?? ''
      if (!type.startsWith('image/')) continue
      const ext = type.includes('svg') ? 'svg' : type.includes('jpeg') ? 'jpg' : 'png'
      const file = `${slug}.${ext}`
      await writeFile(join(BANNER_DIR, file), Buffer.from(await res.arrayBuffer()))
      return { banner: `/images/projects/${file}`, bannerIsFallback: isFallback }
    } catch {
      // try the next rung of the ladder
    }
  }
  return { banner: undefined, bannerIsFallback: true }
}

async function readDylanFile(repo, file) {
  return api(`/repos/${OWNER}/${repo}/contents/.dylan/${file}`, { raw: true })
}

/** `.dylan/star/*.md` in filename order, each paired with its optional `.nl.md`. */
async function readStar(repo) {
  // Parse failures propagate; a malformed STAR file is a build error, not a silent drop.
  const listing = await api(`/repos/${OWNER}/${repo}/contents/.dylan/star`)
  if (!Array.isArray(listing)) return []

  const names = listing
    .filter((entry) => entry.type === 'file' && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort()

  const english = names.filter((name) => !name.endsWith('.nl.md'))

  return Promise.all(
    english.map(async (name) => {
      const dutchName = name.replace(/\.md$/, '.nl.md')
      const [raw, rawNl] = await Promise.all([
        readDylanFile(repo, `star/${name}`),
        names.includes(dutchName) ? readDylanFile(repo, `star/${dutchName}`) : null,
      ])
      const entry = parseStarFile(raw, `${repo}/.dylan/star/${name}`)
      return rawNl
        ? { ...entry, nl: parseStarFile(rawNl, `${repo}/.dylan/star/${dutchName}`) }
        : entry
    }),
  )
}

export async function buildProject(repo) {
  const rawMeta = await readDylanFile(repo.name, 'meta.toml')
  if (rawMeta === null) return null

  let meta
  try {
    meta = metaSchema.parse(parseToml(rawMeta))
  } catch (error) {
    const detail =
      error?.issues?.map((i) => `${i.path.join('.') || '(root)'}: ${i.message}`).join('; ') ??
      error.message
    throw new BuildError(`${repo.name}/.dylan/meta.toml — ${detail}`)
  }

  const slug = slugify(repo.name)
  const [languageBytes, tags, description, descriptionNl, story, storyNl, wiki, star] =
    await Promise.all([
      api(`/repos/${OWNER}/${repo.name}/languages`),
      api(`/repos/${OWNER}/${repo.name}/tags?per_page=100`),
      readDylanFile(repo.name, 'description.md'),
      readDylanFile(repo.name, 'description.nl.md'),
      readDylanFile(repo.name, 'story.md'),
      readDylanFile(repo.name, 'story.nl.md'),
      hasWiki(repo.name),
      readStar(repo.name),
    ])

  const total = Object.values(languageBytes ?? {}).reduce((sum, n) => sum + n, 0)
  const languages = Object.entries(languageBytes ?? {})
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({ name, percent: Math.round((bytes / total) * 100) }))

  const banner = await downloadBanner(slug, [
    {
      url: `https://raw.githubusercontent.com/${OWNER}/${repo.name}/HEAD/.dylan/banner.png`,
      isFallback: false,
    },
    { url: `https://opengraph.githubassets.com/1/${OWNER}/${repo.name}`, isFallback: true },
  ])

  const packages = await Promise.all(
    meta.release.packages.map(async (p) => ({ ...p, version: await packageVersion(p) })),
  )

  return {
    slug,
    name: repo.name,
    url: repo.html_url,
    createdAt: repo.created_at,
    archived: repo.archived,
    featured: meta.featured,
    weight: meta.weight,
    description: (description ?? repo.description ?? '').trim(),
    descriptionNl: descriptionNl?.trim() || undefined,
    story: story?.trim() || undefined,
    storyNl: storyNl?.trim() || undefined,
    ...banner,
    version: latestTag(tags ?? []),
    packages,
    languages,
    homepage: repo.homepage || undefined,
    wiki: wiki ? `${repo.html_url}/wiki` : undefined,
    links: meta.links.map(({ url, label, label_nl }) => ({ url, label, labelNl: label_nl })),
    uses: meta.uses,
    usedBy: [],
    star,
  }
}

/** Reverse edges are derived, never declared, so the two directions cannot drift. */
export function deriveReverseEdges(projects) {
  const bySlug = new Map(projects.map((p) => [slugify(p.name), p]))
  for (const project of projects) {
    for (const relation of project.uses) {
      const target = bySlug.get(slugify(relation.repo))
      relation.slug = target?.slug
      target?.usedBy.push({ repo: project.name, slug: project.slug })
    }
  }
  return projects
}

async function main() {
  if (!TOKEN) {
    console.warn('[projects] No GITHUB_TOKEN — using the 60/hour unauthenticated limit.')
  }

  const repos = await api(`/users/${OWNER}/repos?per_page=100&type=owner`)
  const candidates = (repos ?? []).filter((r) => !r.private)

  const built = (await Promise.all(candidates.map(buildProject))).filter(Boolean)

  deriveReverseEdges(built)
  built.sort(compareProjects)
  await writeFile(OUT_FILE, `${JSON.stringify(built, null, 2)}\n`)
  console.log(
    `[projects] ${built.length} of ${candidates.length} repos have a .dylan directory.`,
  )
}

// Only when executed directly, so the checks can import buildProject without running a fetch.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await rm(BANNER_DIR, { recursive: true, force: true })
  await mkdir(BANNER_DIR, { recursive: true })
  try {
    await main()
  } catch (error) {
    console.error(`[projects] ${error instanceof BuildError ? error.message : error}`)
    process.exit(1)
  }
}
