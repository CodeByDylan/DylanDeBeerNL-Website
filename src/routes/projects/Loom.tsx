import { createFileRoute } from '@tanstack/react-router'
import { VStack } from '@astryxdesign/core/Stack'
import { Heading, Text } from '@astryxdesign/core/Text'

export const Route = createFileRoute('/projects/Loom')({
  component: Loom,
})

function Loom() {
  return (
    <VStack gap={4}>
      <Heading level={1}>Loom</Heading>
      <Text type="body">Nothing here yet.</Text>
    </VStack>
  )
}
