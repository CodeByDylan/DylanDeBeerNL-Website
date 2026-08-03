import type { Locale } from '../i18n'
import generated from './projects.generated.json'
import type { Project, StarEntry } from './projectSchema'

export const GITHUB_PROFILE_URL = 'https://github.com/CodeByDylan'
export const CONTACT_EMAIL = 'dylan@dylandebeer.nl'

export const PROJECTS = generated as Project[]

/** Already sorted by weight then recency at build time. */
export const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured)

export const HOMEPAGE_PROJECTS = FEATURED_PROJECTS.slice(0, 3)

/** Recency only — "latest" is about time, not curation weight. */
export const LATEST_PROJECT = [...FEATURED_PROJECTS].sort((a, b) =>
  b.createdAt.localeCompare(a.createdAt),
)[0]

/** Most-used languages across every project, for the hero. */
export const TOP_LANGUAGES = [
  ...PROJECTS.reduce((totals, project) => {
    for (const language of project.languages) {
      totals.set(language.name, (totals.get(language.name) ?? 0) + language.percent)
    }
    return totals
  }, new Map<string, number>()),
]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 4)
  .map(([name]) => name)

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug)
}

/** Dutch prose when the repo supplied it, English otherwise. */
export function localisedProse(
  project: Project,
  field: 'description' | 'story',
  locale: Locale,
): string | undefined {
  if (locale === 'nl') {
    return field === 'description'
      ? (project.descriptionNl ?? project.description)
      : (project.storyNl ?? project.story)
  }
  return field === 'description' ? project.description : project.story
}

/** Dutch STAR entries when the repo supplied them, English otherwise, per entry. */
export function localisedStar(project: Project, locale: Locale): StarEntry[] {
  return project.star.map(({ nl, ...en }) => (locale === 'nl' && nl ? nl : en))
}

/** Strips inline markdown for previews, which are line-clamped and cannot render it. */
export function toPlainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function localisedLinkLabel(
  link: { label: string; labelNl?: string },
  locale: Locale,
): string {
  return locale === 'nl' ? (link.labelNl ?? link.label) : link.label
}
