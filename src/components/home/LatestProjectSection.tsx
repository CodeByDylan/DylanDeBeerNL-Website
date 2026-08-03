import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Grid } from '@astryxdesign/core/Grid'
import { Heading } from '@astryxdesign/core/Heading'
import { Markdown } from '@astryxdesign/core/Markdown'
import { Section } from '@astryxdesign/core/Section'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { LATEST_PROJECT, localisedProse } from '../../data/projects'
import { useLocale, useTranslate } from '../../i18n'
import ProjectBanner from '../projects/ProjectBanner'

export default function LatestProjectSection() {
  const t = useTranslate()
  const { locale } = useLocale()
  if (!LATEST_PROJECT) return null

  const description = localisedProse(LATEST_PROJECT, 'description', locale)

  return (
    <Section variant="muted" padding={8}>
      <Grid columns={{ minWidth: 340, max: 2 }} gap={8} align="center">
        <ProjectBanner project={LATEST_PROJECT} />
        <VStack gap={4} hAlign="start">
          <Badge variant="success" label={t('app.latest.badge')} />
          <Heading level={2} type="display-3">
            {LATEST_PROJECT.name}
          </Heading>
          {description && <Markdown headingLevelStart={3}>{description}</Markdown>}
          <HStack gap={2} className="flex-wrap">
            {LATEST_PROJECT.version && (
              <Badge variant="blue" label={LATEST_PROJECT.version} />
            )}
            {LATEST_PROJECT.languages.map((language) => (
              <Badge key={language.name} label={`${language.name} ${language.percent}%`} />
            ))}
          </HStack>
          <Button
            variant="primary"
            label={t('app.latest.cta')}
            href={`/projects/${LATEST_PROJECT.slug}`}
          />
        </VStack>
      </Grid>
    </Section>
  )
}
