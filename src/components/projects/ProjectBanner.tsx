import { AspectRatio } from '@astryxdesign/core/AspectRatio'
import { Icon } from '@astryxdesign/core/Icon'
import { VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { CodeBracketIcon } from '@heroicons/react/16/solid'
import type { Project } from '../../data/projectSchema'

const BANNER_RATIO = 1200 / 630

/** Last rung of the banner ladder: themed placeholder when no image resolved at build. */
function BannerPlaceholder({ name }: { name: string }) {
  return (
    <VStack
      gap={2}
      hAlign="center"
      vAlign="center"
      height="100%"
      className="bg-accent-muted"
    >
      <Icon icon={CodeBracketIcon} size="lg" color="accent" />
      <Text type="label">{name}</Text>
    </VStack>
  )
}

export default function ProjectBanner({ project }: { project: Project }) {
  return (
    <AspectRatio
      ratio={BANNER_RATIO}
      fit={project.banner ? 'cover' : undefined}
      className="overflow-hidden rounded-lg border border-solid border-[var(--color-border)]"
    >
      {project.banner ? (
        <img src={project.banner} alt="" />
      ) : (
        <BannerPlaceholder name={project.name} />
      )}
    </AspectRatio>
  )
}
