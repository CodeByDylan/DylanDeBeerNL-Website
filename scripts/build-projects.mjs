import { mkdir, rm, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { projectsResponseSchema } from '../src/data/projectSchema.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BANNER_DIR = join(ROOT, 'public', 'images', 'projects')
const OUT_FILE = join(ROOT, 'src', 'data', 'projects.generated.json')

class BuildError extends Error {}

/**
 * The projects, already assembled and ordered by the API.
 *
 * Nothing is re-sorted or re-derived here. The ordering rule and the `.dylan` formats live in the
 * API's domain precisely so that this site and the CV generator cannot hold divergent copies.
 */
export async function fetchProjects() {
  // Read here rather than at import: a module-level constant would freeze the environment at load
  // and make the order of imports part of the behaviour.
  const API_URL = process.env.PROJECTS_API_URL
  const REFRESH_SECRET = process.env.PROJECTS_REFRESH_SECRET

  if (!API_URL) {
    throw new BuildError('PROJECTS_API_URL is not set.')
  }

  const headers = { Accept: 'application/json' }
  if (REFRESH_SECRET) {
    // Without this a deploy can publish data up to the API's TTL old, which is exactly the wait a
    // deploy is meant to end. Unentitled callers are ignored, so the secret is what makes it work.
    headers['Cache-Control'] = 'no-cache'
    headers['X-Refresh-Token'] = REFRESH_SECRET
  }

  let response
  try {
    response = await fetch(`${API_URL}/v1/projects`, { headers })
  } catch (cause) {
    throw new BuildError(`${API_URL} could not be reached — ${cause.message}`)
  }

  if (!response.ok) {
    throw new BuildError(`${API_URL} answered ${response.status}`)
  }

  const parsed = projectsResponseSchema.safeParse(await response.json())
  if (!parsed.success) {
    const detail = parsed.error.issues
      .map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('; ')
    throw new BuildError(`unexpected response shape — ${detail}`)
  }

  return parsed.data
}

/**
 * Downloads a banner and answers the path this site serves it from.
 *
 * The API reports where the image lives, never where to embed it: the fallback is GitHub's
 * undocumented social-preview host, and hotlinking it would have GitHub serve an image on every page
 * view. A download that fails leaves the project without one, which the banner component handles.
 */
export async function downloadBanner(slug, url) {
  if (!url) return undefined

  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'dylandebeer-web-build' } })
    if (!response.ok) return undefined

    const type = response.headers.get('content-type') ?? ''
    if (!type.startsWith('image/')) return undefined

    const extension = type.includes('svg') ? 'svg' : type.includes('jpeg') ? 'jpg' : 'png'
    const file = `${slug}.${extension}`
    await writeFile(join(BANNER_DIR, file), Buffer.from(await response.arrayBuffer()))

    return `/images/projects/${file}`
  } catch {
    return undefined
  }
}

/** Replaces the API's `bannerUrl` with a path this site serves. */
export async function toProject({ bannerUrl, ...project }) {
  return { ...project, banner: await downloadBanner(project.slug, bannerUrl) }
}

async function main() {
  const { projects, refreshedAt, stale } = await fetchProjects()

  if (stale) {
    // Not fatal: the API serves an older snapshot rather than failing when an upstream is briefly
    // unreachable, and taking the site down instead would be the worse trade.
    console.warn(`[projects] The API is serving a stale snapshot from ${refreshedAt}.`)
  }

  const built = await Promise.all(projects.map(toProject))
  await writeFile(OUT_FILE, `${JSON.stringify(built, null, 2)}\n`)

  console.log(`[projects] ${built.length} projects, assembled ${refreshedAt}.`)
}

// Only when executed directly, so the checks can import the pieces without running a fetch.
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
