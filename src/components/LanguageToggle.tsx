import { Button } from '@astryxdesign/core/Button'
import { LOCALE_LABELS, useLocale } from '../i18n'

/** Locale toggle; the label names the target language in that language. */
export default function LanguageToggle() {
  const { locale, setLocale } = useLocale()

  const next = locale === 'en' ? 'nl' : 'en'

  return (
    <Button
      variant="ghost"
      size="sm"
      label={LOCALE_LABELS[next]}
      onClick={() => setLocale(next)}
    />
  )
}
