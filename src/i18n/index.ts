// Public i18n surface. Pure barrel — internal modules import from ./locales, not from here.
export type { MessageKey } from './messages/en'
export {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_LABELS,
  type Locale,
  isLocale,
  localeOverrides,
} from './locales'
export { I18nProvider, useLocale, useTranslate } from './I18nProvider'
