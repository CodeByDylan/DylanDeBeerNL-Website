import { useState } from 'react'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog'
import { Icon } from '@astryxdesign/core/Icon'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Tab, TabList } from '@astryxdesign/core/TabList'
import { Text } from '@astryxdesign/core/Text'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'
import type { HighlightedProject } from '../../data/projects'
import { useTranslate } from '../../i18n'

type ProjectDialogProps = {
  project: HighlightedProject | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const t = useTranslate()
  const [tab, setTab] = useState('overview')

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
      setTab('overview')
    }
  }

  return (
    <Dialog isOpen={project !== null} onOpenChange={handleOpenChange} width={520}>
      {project && (
        <VStack gap={0}>
          <DialogHeader title={project.name} onOpenChange={handleOpenChange} />
          <VStack gap={4} padding={4}>
            <TabList value={tab} onChange={setTab} size="sm" hasDivider layout="fill">
              <Tab value="overview" label={t('app.projectDialog.tabOverview')} />
              <Tab value="stack" label={t('app.projectDialog.tabStack')} />
              <Tab value="links" label={t('app.projectDialog.tabLinks')} />
            </TabList>
            {tab === 'overview' && (
              <Text type="body" color="secondary" as="p" textWrap="pretty">
                {t(project.summaryKey)}
              </Text>
            )}
            {tab === 'stack' && (
              <VStack gap={3} hAlign="start">
                <Text type="body" color="secondary" as="p">
                  {t('app.projectDialog.stackIntro')}
                </Text>
                <HStack gap={2} className="flex-wrap">
                  {project.stack.map((tech) => (
                    <Badge key={tech} variant="blue" label={tech} />
                  ))}
                </HStack>
              </VStack>
            )}
            {tab === 'links' && (
              <HStack gap={2}>
                <Button
                  variant="secondary"
                  label={t('app.projectDialog.repo')}
                  href={project.repoUrl}
                  target="_blank"
                  endContent={<Icon icon={ArrowTopRightOnSquareIcon} size="sm" />}
                />
              </HStack>
            )}
          </VStack>
        </VStack>
      )}
    </Dialog>
  )
}
