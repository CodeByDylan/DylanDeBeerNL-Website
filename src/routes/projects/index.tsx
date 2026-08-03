import { createFileRoute } from '@tanstack/react-router'
import { Grid } from '@astryxdesign/core/Grid'
import { Heading } from '@astryxdesign/core/Heading'
import { VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import ProjectCard from '../../components/projects/ProjectCard'
import { FEATURED_PROJECTS, PROJECTS } from '../../data/projects'
import { useTranslate } from '../../i18n'

export const Route = createFileRoute('/projects/')({ component: AllProjects })

function AllProjects() {
  const t = useTranslate()
  const rest = PROJECTS.filter((project) => !project.featured)

  return (
    <VStack gap={8} maxWidth={1080} className="mx-auto w-full" paddingBlock={6}>
      <VStack gap={2}>
        <Heading level={1}>{t('app.projects.allTitle')}</Heading>
        <Text type="large" color="secondary" as="p">
          {t('app.projects.subtitle')}
        </Text>
      </VStack>

      {PROJECTS.length === 0 && <Text type="body">{t('app.page.empty')}</Text>}

      {FEATURED_PROJECTS.length > 0 && (
        <VStack gap={4}>
          <Heading level={2}>{t('app.projects.featured')}</Heading>
          <Grid columns={{ minWidth: 280, max: 2 }} gap={4}>
            {FEATURED_PROJECTS.map((project) => (
              <ProjectCard key={project.slug} project={project} hasBanner />
            ))}
          </Grid>
        </VStack>
      )}

      {rest.length > 0 && (
        <VStack gap={4}>
          <Heading level={2}>{t('app.projects.everything')}</Heading>
          <Grid columns={{ minWidth: 240, max: 3 }} gap={4}>
            {rest.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Grid>
        </VStack>
      )}
    </VStack>
  )
}
