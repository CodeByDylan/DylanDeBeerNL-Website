import { z } from 'zod'

/**
 * The shape of `GET /v1/projects`.
 *
 * Thin on purpose. The API owns the rules — which registries exist, that a URL is a URL, that a
 * `.dylan` file is well formed — and re-implementing any of them here is how two copies of a rule
 * start disagreeing. This exists to catch a contract break, not to re-validate content.
 *
 * Objects are non-strict, so a field the API adds is dropped rather than failing the build. Only a
 * field that *disappears* or changes type is a break worth stopping for.
 */
const starEntrySchema = z.object({
  title: z.string(),
  situation: z.string(),
  task: z.string(),
  action: z.string(),
  result: z.string(),
})

const apiProjectSchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.url(),
  createdAt: z.string(),
  archived: z.boolean(),
  featured: z.boolean(),
  weight: z.number(),
  description: z.string(),
  descriptionNl: z.string().optional(),
  story: z.string().optional(),
  storyNl: z.string().optional(),
  /** Where the banner can be fetched from. The build downloads it; the site never embeds it. */
  bannerUrl: z.url().optional(),
  bannerIsFallback: z.boolean(),
  version: z.string().optional(),
  homepage: z.url().optional(),
  wiki: z.url().optional(),
  packages: z.array(
    z.object({
      registry: z.enum(['nuget', 'maven']),
      id: z.string(),
      version: z.string().optional(),
    }),
  ),
  languages: z.array(z.object({ name: z.string(), percent: z.number() })),
  links: z.array(
    z.object({ url: z.url(), label: z.string(), labelNl: z.string().optional() }),
  ),
  uses: z.array(
    z.object({ repo: z.string(), note: z.string().optional(), slug: z.string().optional() }),
  ),
  usedBy: z.array(
    z.object({ repo: z.string(), note: z.string().optional(), slug: z.string().optional() }),
  ),
  star: z.array(starEntrySchema.extend({ nl: starEntrySchema.optional() })),
})

export const projectsResponseSchema = z.object({
  projects: z.array(apiProjectSchema),
  refreshedAt: z.string(),
  /** True when the API's last refresh failed and it is answering from an older snapshot. */
  stale: z.boolean(),
})

export type ApiProject = z.infer<typeof apiProjectSchema>

export type StarEntry = z.infer<typeof starEntrySchema>
export type ProjectLanguage = ApiProject['languages'][number]
export type ProjectRelation = ApiProject['uses'][number]
export type ProjectPackage = ApiProject['packages'][number]

/**
 * A project as this site holds it: the API's payload with the banner downloaded.
 *
 * `bannerUrl` deliberately does not survive the build. Its fallback is GitHub's undocumented
 * social-preview host, and embedding that would have GitHub serve an image on every page view.
 */
export type Project = Omit<ApiProject, 'bannerUrl'> & { banner?: string }
