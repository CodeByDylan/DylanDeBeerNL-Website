import { z } from 'zod'

/** Sorts after any explicitly weighted project. */
export const UNSET_WEIGHT = 1000

const localisedLabel = z.object({
  url: z.url(),
  label: z.string().min(1),
  label_nl: z.string().min(1).optional(),
})

/** Shape of `.dylan/meta.toml`. Unknown keys are rejected so typos surface as build errors. */
export const metaSchema = z
  .object({
    featured: z.boolean().default(false),
    weight: z.number().int().min(0).default(UNSET_WEIGHT),
    release: z
      .object({
        packages: z
          .array(
            z.object({
              registry: z.enum(['nuget', 'maven']),
              id: z.string().min(1),
            }),
          )
          .default([]),
      })
      .strict()
      .default({ packages: [] }),
    links: z.array(localisedLabel.strict()).default([]),
    uses: z
      .array(z.object({ repo: z.string().min(1), note: z.string().optional() }).strict())
      .default([]),
  })
  .strict()

export const STAR_FIELDS = ['situation', 'task', 'action', 'result'] as const
export type StarField = (typeof STAR_FIELDS)[number]

export type StarEntry = { title: string } & Record<StarField, string>

/**
 * Parses `.dylan/star/*.md`: `# title`, then one `## <field>` per STAR field.
 * The headings are machine keys and stay English in every locale — the labels
 * the page renders come from the message catalogs.
 */
export function parseStarFile(markdown: string, source: string): StarEntry {
  const title = /^#\s+(.+?)\s*$/m.exec(markdown)?.[1]
  if (!title) throw new Error(`${source} — missing the "# title" heading`)

  const sections = new Map<string, string>()
  const pattern = /^##\s+([a-z]+)\s*$/gm
  const matches = [...markdown.matchAll(pattern)]

  for (const [index, match] of matches.entries()) {
    const start = match.index + match[0].length
    const end = index + 1 < matches.length ? matches[index + 1].index : markdown.length
    sections.set(match[1], markdown.slice(start, end).trim())
  }

  const missing = STAR_FIELDS.filter((field) => !sections.get(field))
  if (missing.length > 0) {
    throw new Error(`${source} — missing or empty section(s): ${missing.join(', ')}`)
  }

  const unknown = [...sections.keys()].filter(
    (key) => !STAR_FIELDS.includes(key as StarField),
  )
  if (unknown.length > 0) {
    throw new Error(`${source} — unknown section(s): ${unknown.join(', ')}`)
  }

  return {
    title,
    situation: sections.get('situation') as string,
    task: sections.get('task') as string,
    action: sections.get('action') as string,
    result: sections.get('result') as string,
  }
}

export type ProjectMeta = z.infer<typeof metaSchema>

export type ProjectLanguage = { name: string; percent: number }
export type ProjectRelation = { repo: string; note?: string; slug?: string }
export type ProjectPackage = { registry: 'nuget' | 'maven'; id: string; version?: string }

export type Project = {
  slug: string
  name: string
  url: string
  createdAt: string
  archived: boolean
  featured: boolean
  weight: number
  description: string
  descriptionNl?: string
  story?: string
  storyNl?: string
  banner?: string
  bannerIsFallback: boolean
  version?: string
  packages: ProjectPackage[]
  languages: ProjectLanguage[]
  homepage?: string
  wiki?: string
  links: Array<{ url: string; label: string; labelNl?: string }>
  uses: ProjectRelation[]
  usedBy: ProjectRelation[]
  star: Array<StarEntry & { nl?: StarEntry }>
}

/** Weight ascending, then newest first. */
export function compareProjects(
  a: Pick<Project, 'weight' | 'createdAt'>,
  b: Pick<Project, 'weight' | 'createdAt'>,
): number {
  if (a.weight !== b.weight) return a.weight - b.weight
  return b.createdAt.localeCompare(a.createdAt)
}

export const slugify = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** GitHub returns tags in commit order, so a late-pushed old tag would otherwise win. */
export function latestTag(tags: Array<{ name: string }>): string | undefined {
  const semver = tags
    .map((tag) => ({ name: tag.name, match: /^v?(\d+)\.(\d+)\.(\d+)/.exec(tag.name) }))
    .filter((tag) => tag.match !== null)
    .map((tag) => ({ name: tag.name, key: (tag.match as RegExpExecArray).slice(1, 4).map(Number) }))

  if (semver.length === 0) return tags[0]?.name
  semver.sort((a, b) => b.key[0] - a.key[0] || b.key[1] - a.key[1] || b.key[2] - a.key[2])
  return semver[0].name
}
