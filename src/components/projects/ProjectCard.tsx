import { Badge } from '@astryxdesign/core/Badge'
import { ClickableCard } from '@astryxdesign/core/ClickableCard'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import type { Project } from '../../data/projectSchema'
import { localisedProse, toPlainText } from '../../data/projects'
import { useLocale, useTranslate } from '../../i18n'
import ProjectBanner from './ProjectBanner'

type ProjectCardProps = { project: Project; hasBanner?: boolean }

export default function ProjectCard({ project, hasBanner = false }: ProjectCardProps) {
  const t = useTranslate()
  const { locale } = useLocale()
  const description = localisedProse(project, 'description', locale)

  return (
    <ClickableCard
      label={project.name}
      href={`/projects/${project.slug}`}
      elevation="low"
      padding={hasBanner ? 0 : 5}
    >
      <VStack gap={0} height="100%">
        {hasBanner && <ProjectBanner project={project} />}
        <VStack gap={3} hAlign="start" padding={hasBanner ? 5 : 0} height="100%">
          <HStack gap={2} vAlign="center" className="flex-wrap">
            <Heading level={3}>{project.name}</Heading>
            {project.archived && <Badge label={t('app.project.archived')} />}
          </HStack>
          {description && (
            <Text type="supporting" as="p" maxLines={2}>
              {toPlainText(description)}
            </Text>
          )}
          <HStack gap={1.5} className="mt-auto flex-wrap">
            {project.version && <Badge variant="success" label={project.version} />}
            {project.languages.slice(0, 3).map((language) => (
              <Badge key={language.name} label={`${language.name} ${language.percent}%`} />
            ))}
          </HStack>
        </VStack>
      </VStack>
    </ClickableCard>
  )
}
