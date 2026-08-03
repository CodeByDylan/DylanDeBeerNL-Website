import type { MessageKey } from '../i18n'

export const GITHUB_PROFILE_URL = 'https://github.com/CodeByDylan'
export const CONTACT_EMAIL = 'contactdutchy@gmail.com'

export type HighlightedProject = {
  name: string
  summaryKey: MessageKey
  repoUrl: string
  stack: string[]
}

export const LATEST_PROJECT = {
  name: 'Loom',
  repoUrl: 'https://github.com/CodeByDylan/Loom',
  image: '/images/project-loom.svg',
  /** Intrinsic ratio of the image (800x500); matches so cover never crops. */
  imageRatio: 800 / 500,
  stack: ['TypeScript', 'React', 'TanStack Start'],
} as const

export const HIGHLIGHTED_PROJECTS: HighlightedProject[] = [
  {
    name: 'Loom',
    summaryKey: 'app.project.loom.summary',
    repoUrl: 'https://github.com/CodeByDylan/Loom',
    stack: ['TypeScript', 'React', 'TanStack Start'],
  },
  {
    name: 'ResourcePackIdentifier',
    summaryKey: 'app.project.rpi.summary',
    repoUrl: 'https://github.com/CodeByDylan/ResourcePackIdentifier',
    stack: ['C#', '.NET'],
  },
  {
    name: 'dylandebeer-web',
    summaryKey: 'app.project.web.summary',
    repoUrl: 'https://github.com/CodeByDylan/dylandebeer-web',
    stack: ['TypeScript', 'React', 'Astryx', 'Tailwind CSS'],
  },
]
