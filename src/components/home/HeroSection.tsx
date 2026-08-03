import { AspectRatio } from '@astryxdesign/core/AspectRatio'
import { Badge } from '@astryxdesign/core/Badge'
import { Button } from '@astryxdesign/core/Button'
import { Card } from '@astryxdesign/core/Card'
import { Heading } from '@astryxdesign/core/Heading'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { LOGO_BLACK_SRC, LOGO_RATIO } from '../../data/brand'
import { LATEST_PROJECT } from '../../data/projects'
import { useTranslate } from '../../i18n'

export default function HeroSection() {
  const t = useTranslate()

  return (
    <VStack
      gap={6}
      hAlign="center"
      paddingBlock={10}
      className="relative isolate text-center"
    >
      {/* Soft accent glow, token-backed. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(560px_280px_at_50%_12%,var(--color-accent-muted),transparent_70%)]"
      />
      <Card padding={5} elevation="low" className="w-fit bg-[var(--brand-logo-plate)]">
        <AspectRatio ratio={LOGO_RATIO} fit="contain" className="w-44">
          <img src={LOGO_BLACK_SRC} alt={t('app.brand.name')} />
        </AspectRatio>
      </Card>
      <Badge variant="blue" label={t('app.hero.kicker')} />
      <Heading level={1} type="display-1" textWrap="balance" className="max-w-3xl">
        {t('app.hero.title')}
      </Heading>
      <Text type="large" color="secondary" as="p" textWrap="pretty" className="max-w-xl">
        {t('app.hero.subtitle')}
      </Text>
      <HStack gap={3} className="flex-wrap justify-center">
        <Button variant="primary" size="lg" label={t('app.hero.ctaProjects')} href="/projects" />
        <Button variant="secondary" size="lg" label={t('app.hero.ctaContact')} href="#contact" />
      </HStack>
      <HStack gap={2} className="flex-wrap justify-center">
        {LATEST_PROJECT.stack.map((tech) => (
          <Badge key={tech} label={tech} />
        ))}
      </HStack>
    </VStack>
  )
}
