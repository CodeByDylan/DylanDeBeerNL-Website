import { createFileRoute } from '@tanstack/react-router'
import { Heading } from '@astryxdesign/core/Heading'
import { VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import type { MessageKey } from '../i18n'
import { useTranslate } from '../i18n'

export const Route = createFileRoute('/cookies')({ component: CookiesPage })

const SECTIONS: Array<{ titleKey: MessageKey; bodyKey: MessageKey }> = [
  { titleKey: 'app.cookies.what.title', bodyKey: 'app.cookies.what.body' },
  { titleKey: 'app.cookies.use.title', bodyKey: 'app.cookies.use.body' },
  { titleKey: 'app.cookies.manage.title', bodyKey: 'app.cookies.manage.body' },
]

function CookiesPage() {
  const t = useTranslate()

  return (
    <VStack gap={6} maxWidth={720} className="mx-auto w-full" paddingBlock={6}>
      <VStack gap={2}>
        <Heading level={1}>{t('app.cookies.title')}</Heading>
        <Text type="supporting">{t('app.cookies.updated')}</Text>
      </VStack>
      <Text type="body" as="p" textWrap="pretty">
        {t('app.cookies.intro')}
      </Text>
      {SECTIONS.map(({ titleKey, bodyKey }) => (
        <VStack key={titleKey} gap={2}>
          <Heading level={2}>{t(titleKey)}</Heading>
          <Text type="body" color="secondary" as="p" textWrap="pretty">
            {t(bodyKey)}
          </Text>
        </VStack>
      ))}
    </VStack>
  )
}
