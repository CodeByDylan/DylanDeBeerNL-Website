import type { Overrides } from '@astryxdesign/core/i18n'
import { en } from './messages/en'
import { nl } from './messages/nl'

// Leaf module: must not import from index.ts or I18nProvider.tsx (import cycle).

export const LOCALES = ['en', 'nl'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Language names, each in its own language. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  nl: 'Nederlands',
}

/** Passed as provider `overrides`; untranslated Astryx keys fall back to shipped English. */
export const localeOverrides: Overrides = { en, nl }

export function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}
