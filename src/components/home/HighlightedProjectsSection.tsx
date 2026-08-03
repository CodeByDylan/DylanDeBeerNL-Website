import { Grid } from '@astryxdesign/core/Grid'
import { VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { HOMEPAGE_PROJECTS } from '../../data/projects'
import { useTranslate } from '../../i18n'
import ProjectCard from '../projects/ProjectCard'

export default function HighlightedProjectsSection() {
  const t = useTranslate()
  if (HOMEPAGE_PROJECTS.length === 0) return null

  return (
    <VStack gap={6}>
      <Text type="large" color="secondary" justify="center" as="p">
        {t('app.highlights.subtitle')}
      </Text>
      <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
        {HOMEPAGE_PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Grid>
    </VStack>
  )
}
