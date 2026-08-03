import { useState } from 'react'
import { Badge } from '@astryxdesign/core/Badge'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Grid } from '@astryxdesign/core/Grid'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import {
  HIGHLIGHTED_PROJECTS,
  type HighlightedProject,
} from '../../data/projects'
import { useTranslate } from '../../i18n'
import ProjectDialog from './ProjectDialog'

export default function HighlightedProjectsSection() {
  const t = useTranslate()
  const [selected, setSelected] = useState<HighlightedProject | null>(null)

  return (
    <VStack gap={6}>
      <Text type="large" color="secondary" justify="center" as="p">
        {t('app.highlights.subtitle')}
      </Text>
      <Grid columns={{ minWidth: 260, max: 3 }} gap={4}>
        {HIGHLIGHTED_PROJECTS.map((project) => (
          <ClickableCard
            key={project.name}
            label={project.name}
            elevation="low"
            padding={5}
            onClick={() => setSelected(project)}
          >
            <VStack gap={3} hAlign="start" height="100%">
              <Heading level={3}>{project.name}</Heading>
              <Text type="supporting" as="p" maxLines={2}>
                {t(project.summaryKey)}
              </Text>
              <HStack gap={1.5} className="mt-auto flex-wrap">
                {project.stack.slice(0, 3).map((tech) => (
                  <Badge key={tech} label={tech} />
                ))}
              </HStack>
              <Text type="supporting" color="accent">
                {t('app.highlights.cardHint')}
              </Text>
            </VStack>
          </ClickableCard>
        ))}
      </Grid>
      <ProjectDialog project={selected} onClose={() => setSelected(null)} />
    </VStack>
  )
}
