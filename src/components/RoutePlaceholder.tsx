import { useRouter } from '@tanstack/react-router'
import { Button } from '@astryxdesign/core/Button'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import type { MessageKey } from '../i18n'
import { useTranslate } from '../i18n'

type RoutePlaceholderProps = {
  titleKey: MessageKey
  bodyKey: MessageKey
}

/** Shared layout for the not-found and error pages: go back, or go home. */
export default function RoutePlaceholder({
  titleKey,
  bodyKey,
}: RoutePlaceholderProps) {
  const router = useRouter()
  const t = useTranslate()

  return (
    <VStack gap={5} hAlign="center" paddingBlock={10} className="text-center">
      <Heading level={1} type="display-2">
        {t(titleKey)}
      </Heading>
      <Text type="body" color="secondary" as="p" textWrap="pretty" className="max-w-md">
        {t(bodyKey)}
      </Text>
      <HStack gap={3}>
        <Button
          variant="secondary"
          label={t('app.action.back')}
          onClick={() => router.history.back()}
        />
        <Button variant="primary" label={t('app.action.home')} href="/" />
      </HStack>
    </VStack>
  )
}

export function NotFoundPage() {
  return <RoutePlaceholder titleKey="app.notFound.title" bodyKey="app.notFound.body" />
}

export function ErrorPage() {
  return <RoutePlaceholder titleKey="app.error.title" bodyKey="app.error.body" />
}
