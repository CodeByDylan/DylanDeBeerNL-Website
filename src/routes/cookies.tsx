import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@astryxdesign/core/Card'
import { Divider } from '@astryxdesign/core/Divider'
import { Heading } from '@astryxdesign/core/Heading'
import { Link } from '@astryxdesign/core/Link'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { CONTACT_EMAIL } from '../data/projects'
import type { MessageKey } from '../i18n'
import { useTranslate } from '../i18n'

export const Route = createFileRoute('/cookies')({ component: CookiesPage })

const SECTIONS: Array<{ titleKey: MessageKey; bodyKey: MessageKey }> = [
  { titleKey: 'app.cookies.analytics.title', bodyKey: 'app.cookies.analytics.body' },
  { titleKey: 'app.cookies.consent.title', bodyKey: 'app.cookies.consent.body' },
  { titleKey: 'app.cookies.control.title', bodyKey: 'app.cookies.control.body' },
  { titleKey: 'app.cookies.changes.title', bodyKey: 'app.cookies.changes.body' },
]

const STORED_ITEM: Array<{ labelKey: MessageKey; valueKey: MessageKey }> = [
  { labelKey: 'app.cookies.stored.nameLabel', valueKey: 'app.cookies.stored.nameValue' },
  {
    labelKey: 'app.cookies.stored.purposeLabel',
    valueKey: 'app.cookies.stored.purposeValue',
  },
  {
    labelKey: 'app.cookies.stored.contentLabel',
    valueKey: 'app.cookies.stored.contentValue',
  },
  {
    labelKey: 'app.cookies.stored.retentionLabel',
    valueKey: 'app.cookies.stored.retentionValue',
  },
  { labelKey: 'app.cookies.stored.sentLabel', valueKey: 'app.cookies.stored.sentValue' },
]

function CookiesPage() {
  const t = useTranslate()

  return (
    <VStack gap={6} maxWidth={720} className="mx-auto w-full" paddingBlock={6}>
      <VStack gap={2}>
        <Heading level={1}>{t('app.cookies.title')}</Heading>
        <Text type="supporting">{t('app.cookies.updated')}</Text>
      </VStack>

      <Text type="large" as="p" textWrap="pretty">
        {t('app.cookies.intro')}
      </Text>

      <VStack gap={2}>
        <Heading level={2}>{t('app.cookies.none.title')}</Heading>
        <Text type="body" color="secondary" as="p" textWrap="pretty">
          {t('app.cookies.none.body')}
        </Text>
      </VStack>

      <VStack gap={3}>
        <Heading level={2}>{t('app.cookies.stored.title')}</Heading>
        <Text type="body" color="secondary" as="p" textWrap="pretty">
          {t('app.cookies.stored.body')}
        </Text>
        <Card variant="muted" padding={5}>
          <VStack gap={3}>
            {STORED_ITEM.map(({ labelKey, valueKey }, index) => (
              <VStack key={labelKey} gap={3}>
                {index > 0 && <Divider />}
                <HStack gap={4} justify="between" className="flex-wrap">
                  <Text type="label">{t(labelKey)}</Text>
                  <Text type="body" color="secondary">
                    {t(valueKey)}
                  </Text>
                </HStack>
              </VStack>
            ))}
          </VStack>
        </Card>
      </VStack>

      {SECTIONS.map(({ titleKey, bodyKey }) => (
        <VStack key={titleKey} gap={2}>
          <Heading level={2}>{t(titleKey)}</Heading>
          <Text type="body" color="secondary" as="p" textWrap="pretty">
            {t(bodyKey)}
          </Text>
        </VStack>
      ))}

      <VStack gap={2} hAlign="start">
        <Heading level={2}>{t('app.cookies.contact.title')}</Heading>
        <Text type="body" color="secondary" as="p" textWrap="pretty">
          {t('app.cookies.contact.body')}
        </Text>
        <Link href={`mailto:${CONTACT_EMAIL}`} isStandalone>
          {CONTACT_EMAIL}
        </Link>
      </VStack>
    </VStack>
  )
}
