import { createFileRoute, notFound } from '@tanstack/react-router'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { CollapsibleGroup } from '@astryxdesign/core/Collapsible'
import { Divider } from '@astryxdesign/core/Divider'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { Link } from '@astryxdesign/core/Link'
import { Markdown } from '@astryxdesign/core/Markdown'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'
import AnimatedCollapsible from '../../components/AnimatedCollapsible'
import ProjectBanner from '../../components/projects/ProjectBanner'
import type { Project, ProjectRelation } from '#/data/projectSchema.ts'
import { getProject, localisedLinkLabel, localisedProse, localisedStar } from '#/data/projects.ts'
import type { MessageKey } from '#/i18n'
import { useLocale, useTranslate } from '#/i18n'

export const Route = createFileRoute('/projects/$repo')({
  loader: ({ params }) => {
    const project = getProject(params.repo)
    if (!project) throw notFound()
    return project
  },
  component: ProjectPage,
})

function RelationList({
  titleKey,
  relations,
}: {
  titleKey: MessageKey
  relations: ProjectRelation[]
}) {
  const t = useTranslate()
  if (relations.length === 0) return null

  return (
    <VStack gap={2} hAlign="start">
      <Heading level={3}>{t(titleKey)}</Heading>
      {relations.map((relation) => (
        <HStack key={relation.repo} gap={2} vAlign="center" className="flex-wrap">
          <Link
            href={
              relation.slug
                ? `/projects/${relation.slug}`
                : `https://github.com/CodeByDylan/${relation.repo}`
            }
            isStandalone
          >
            {relation.repo}
          </Link>
          {relation.note && <Text type="supporting">{relation.note}</Text>}
        </HStack>
      ))}
    </VStack>
  )
}

function ProjectPage() {
  const project = Route.useLoaderData() as Project
  const t = useTranslate()
  const { locale } = useLocale()

  const description = localisedProse(project, 'description', locale)
  const story = localisedProse(project, 'story', locale)
  const star = localisedStar(project, locale)

  return (
    <VStack gap={6} maxWidth={860} className="mx-auto w-full" paddingBlock={6}>
      <ProjectBanner project={project} />

      <VStack gap={3} hAlign="start">
        <HStack gap={2} vAlign="center" className="flex-wrap">
          <Heading level={1}>{project.name}</Heading>
          {project.archived && <Badge label={t('app.project.archived')} />}
        </HStack>
        {description && <Markdown headingLevelStart={2}>{description}</Markdown>}
      </VStack>

      <Card variant="muted" padding={5}>
        <VStack gap={4}>
          {(project.version || project.packages.length > 0) && (
            <VStack gap={2} hAlign="start">
              <Text type="label">{t('app.project.version')}</Text>
              <HStack gap={2} className="flex-wrap">
                {project.version && <Badge variant="success" label={project.version} />}
                {project.packages.map((pkg) => (
                  <Badge
                    key={`${pkg.registry}:${pkg.id}`}
                    variant="blue"
                    label={`${pkg.id}${pkg.version ? ` ${pkg.version}` : ''}`}
                  />
                ))}
              </HStack>
            </VStack>
          )}

          {project.languages.length > 0 && (
            <VStack gap={2} hAlign="start">
              <Text type="label">{t('app.project.languages')}</Text>
              <HStack gap={2} className="flex-wrap">
                {project.languages.map((language) => (
                  <Badge
                    key={language.name}
                    label={`${language.name} ${language.percent < 1 ? '<1' : language.percent}%`}
                  />
                ))}
              </HStack>
            </VStack>
          )}

          <Divider />

          <HStack gap={3} className="flex-wrap">
            <Button
              variant="primary"
              size="sm"
              label={t('app.project.viewOnGitHub')}
              href={project.url}
              target="_blank"
              endContent={<Icon icon={ArrowTopRightOnSquareIcon} size="sm" />}
            />
            {project.homepage && (
              <Button
                variant="secondary"
                size="sm"
                label={t('app.project.website')}
                href={project.homepage}
                target="_blank"
              />
            )}
            {project.wiki && (
              <Button
                variant="secondary"
                size="sm"
                label={t('app.project.wiki')}
                href={project.wiki}
                target="_blank"
              />
            )}
            {project.links.map((link) => (
              <Button
                key={link.url}
                variant="secondary"
                size="sm"
                label={localisedLinkLabel(link, locale)}
                href={link.url}
                target="_blank"
              />
            ))}
          </HStack>
        </VStack>
      </Card>

      {story && (
        <VStack gap={3} hAlign="start">
          <Heading level={2}>{t('app.project.story')}</Heading>
          <Markdown headingLevelStart={3}>{story}</Markdown>
        </VStack>
      )}

      {star.length > 0 && (
        <VStack gap={3}>
          <Heading level={2}>{t('app.project.star')}</Heading>
          <CollapsibleGroup type="single">
            {star.map((entry, index) => (
              <VStack key={entry.title} gap={0}>
                {index > 0 && <Divider />}
                <AnimatedCollapsible
                  value={entry.title}
                  trigger={<Text type="label">{entry.title}</Text>}
                >
                  <VStack gap={3}>
                    {(
                      [
                        ['app.project.situation', entry.situation],
                        ['app.project.task', entry.task],
                        ['app.project.action', entry.action],
                        ['app.project.result', entry.result],
                      ] as Array<[MessageKey, string]>
                    ).map(([labelKey, value]) => (
                      <VStack key={labelKey} gap={1} hAlign="start">
                        <Text type="label" color="accent">
                          {t(labelKey)}
                        </Text>
                        <Markdown density="compact" headingLevelStart={4}>
                          {value}
                        </Markdown>
                      </VStack>
                    ))}
                  </VStack>
                </AnimatedCollapsible>
              </VStack>
            ))}
          </CollapsibleGroup>
        </VStack>
      )}

      {(project.uses.length > 0 || project.usedBy.length > 0) && (
        <VStack gap={4}>
          <Heading level={2}>{t('app.project.relations')}</Heading>
          <RelationList titleKey="app.project.uses" relations={project.uses} />
          <RelationList titleKey="app.project.usedBy" relations={project.usedBy} />
        </VStack>
      )}
    </VStack>
  )
}
