import { AspectRatio } from '@astryxdesign/core/AspectRatio'
import { Divider } from '@astryxdesign/core/Divider'
import { Link } from '@astryxdesign/core/Link'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { LOGO_RATIO, LOGO_SRC } from '../data/brand'
import { useTranslate } from '../i18n'

export default function SiteFooter() {
  const t = useTranslate()
  const year = String(new Date().getFullYear())

  return (
    <VStack gap={5} paddingBlock={8} className="mt-16">
      <Divider />
      <HStack justify="between" vAlign="start" className="flex-wrap gap-6">
        <HStack gap={3} vAlign="center">
          {/* alt="" — the brand name sits directly beside it. */}
          <AspectRatio ratio={LOGO_RATIO} fit="contain" className="w-12 shrink-0">
            <img src={LOGO_SRC} alt="" />
          </AspectRatio>
          <VStack gap={1} hAlign="start">
            <Text type="label">{t('app.brand.name')}</Text>
            <Text type="supporting" className="max-w-xs">
              {t('app.footer.tagline')}
            </Text>
          </VStack>
        </HStack>
        <HStack gap={5} className="flex-wrap">
          <Link href="/" isStandalone>
            {t('app.nav.home')}
          </Link>
          <Link href="/about" isStandalone>
            {t('app.nav.about')}
          </Link>
          <Link href="/projects" isStandalone>
            {t('app.nav.allProjects')}
          </Link>
          <Link href="/cookies" isStandalone>
            {t('app.footer.cookies')}
          </Link>
        </HStack>
      </HStack>
      <Text type="supporting" justify="center" as="p">
        {t('app.footer.rights', { year })}
      </Text>
    </VStack>
  )
}
