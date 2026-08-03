import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Grid } from '@astryxdesign/core/Grid'
import { Heading } from '@astryxdesign/core/Heading'
import { Section } from '@astryxdesign/core/Section'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'
import { Icon } from '@astryxdesign/core/Icon'
import { LATEST_PROJECT } from '../../data/projects'
import { useTranslate } from '../../i18n'

export default function LatestProjectSection() {
  const t = useTranslate()

  return (
    <Section variant="muted" padding={8}>
      <Grid columns={{ minWidth: 340, max: 2 }} gap={8} align="center">
        <img
          src={LATEST_PROJECT.image}
          alt={t('app.latest.imageAlt')}
          className="w-full rounded-container border border-solid border-[var(--color-border)]"
        />
        <VStack gap={4} hAlign="start">
          <Badge variant="success" label={t('app.latest.badge')} />
          <Heading level={2} type="display-3">
            {LATEST_PROJECT.name}
          </Heading>
          <Text type="large" color="secondary" as="p">
            {t('app.latest.tagline')}
          </Text>
          <Text type="body" as="p" textWrap="pretty">
            {t('app.latest.body1')}
          </Text>
          <Text type="body" as="p" textWrap="pretty">
            {t('app.latest.body2')}
          </Text>
          <HStack gap={2} className="flex-wrap">
            {LATEST_PROJECT.stack.map((tech) => (
              <Badge key={tech} label={tech} />
            ))}
          </HStack>
          <Button
            variant="primary"
            label={t('app.latest.cta')}
            href={LATEST_PROJECT.repoUrl}
            target="_blank"
            endContent={<Icon icon={ArrowTopRightOnSquareIcon} size="sm" />}
          />
        </VStack>
      </Grid>
    </Section>
  )
}
