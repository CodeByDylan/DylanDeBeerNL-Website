import { Button } from '@astryxdesign/core/Button'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { Section } from '@astryxdesign/core/Section'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { EnvelopeIcon } from '@heroicons/react/16/solid'
import { CONTACT_EMAIL, GITHUB_PROFILE_URL } from '../data/projects'
import { useTranslate } from '../i18n'

/** Reusable contact block: used on the homepage, fit for a contact page. */
export default function ContactSection() {
  const t = useTranslate()

  return (
    <Section variant="muted" padding={8} id="contact">
      <VStack gap={4} hAlign="center" className="text-center">
        <Heading level={2} type="display-3">
          {t('app.contact.title')}
        </Heading>
        <Text type="body" color="secondary" as="p" textWrap="pretty" className="max-w-xl">
          {t('app.contact.body')}
        </Text>
        <HStack gap={3} className="flex-wrap justify-center">
          <Button
            variant="primary"
            label={t('app.contact.email')}
            href={`mailto:${CONTACT_EMAIL}`}
            icon={<Icon icon={EnvelopeIcon} size="sm" />}
          />
          <Button
            variant="secondary"
            label={t('app.contact.github')}
            href={GITHUB_PROFILE_URL}
            target="_blank"
          />
        </HStack>
      </VStack>
    </Section>
  )
}
