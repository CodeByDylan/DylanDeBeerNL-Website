import { createFileRoute } from '@tanstack/react-router'
import { VStack } from '@astryxdesign/core/Stack'
import { Heading, Text } from '@astryxdesign/core/Text'
import { useTranslate } from '../../i18n'

export const Route = createFileRoute('/projects/ResourcePackIdentifier')({
  component: ResourcePackIdentifier,
})

function ResourcePackIdentifier() {
  const t = useTranslate()

  return (
    <VStack gap={4}>
      <Heading level={1}>ResourcePackIdentifier</Heading>
      <Text type="body">{t('app.page.empty')}</Text>
    </VStack>
  )
}
