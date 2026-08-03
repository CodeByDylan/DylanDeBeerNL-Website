import { createFileRoute } from '@tanstack/react-router'
import { VStack } from '@astryxdesign/core/Stack'
import { Heading, Text } from '@astryxdesign/core/Text'

export const Route = createFileRoute('/projects/ResourcePackIdentifier')({
  component: ResourcePackIdentifier,
})

function ResourcePackIdentifier() {
  return (
    <VStack gap={4}>
      <Heading level={1}>ResourcePackIdentifier</Heading>
      <Text type="body">Nothing here yet.</Text>
    </VStack>
  )
}
