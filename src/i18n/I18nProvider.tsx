import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  InternationalizationProvider,
  getLocaleDirection,
  useTranslator,
} from '@astryxdesign/core/i18n'
import { DEFAULT_LOCALE, type Locale, isLocale, localeOverrides } from './locales'
import type { MessageKey } from './messages/en'

const STORAGE_KEY = 'locale'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
})

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Read storage after mount so SSR and first client render stay identical.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) setLocaleState(stored)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = getLocaleDirection(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale])

  return (
    <LocaleContext.Provider value={value}>
      <InternationalizationProvider locale={locale} overrides={localeOverrides}>
        {children}
      </InternationalizationProvider>
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  return useContext(LocaleContext)
}

/** Astryx's translator narrowed to the app's MessageKey set. */
export function useTranslate() {
  const translate = useTranslator()
  return useCallback(
    (key: MessageKey, values?: Record<string, unknown>) =>
      translate(key, values),
    [translate],
  )
}
