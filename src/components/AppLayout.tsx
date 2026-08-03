import { useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { AppShell, useAppShellMobile } from '@astryxdesign/core/AppShell'
import { Banner } from '@astryxdesign/core/Banner'
import { Icon } from '@astryxdesign/core/Icon'
import { LinkProvider } from '@astryxdesign/core/Link'
import { NavIcon } from '@astryxdesign/core/NavIcon'
import { SideNav, SideNavItem, SideNavSection } from '@astryxdesign/core/SideNav'
import { TopNav, TopNavHeading, TopNavItem } from '@astryxdesign/core/TopNav'
import {
  ArrowTurnDownRightIcon,
  CodeBracketIcon,
  CubeIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/16/solid'
import { useTranslate } from '../i18n'
import LanguageToggle from './LanguageToggle'
import RouterLink from './RouterLink'
import SiteFooter from './SiteFooter'

// Proper nouns; not translated.
const PROJECTS = [
  { label: 'Loom', href: '/projects/Loom' },
  { label: 'ResourcePackIdentifier', href: '/projects/ResourcePackIdentifier' },
] as const

/** Dismisses the mobile drawer after a client-side navigation. */
function CloseMobileNavOnNavigate({ pathname }: { pathname: string }) {
  const { closeMobileNav } = useAppShellMobile()
  const lastPathname = useRef(pathname)

  useEffect(() => {
    // closeMobileNav is not referentially stable; only fire on real path changes.
    if (lastPathname.current === pathname) return
    lastPathname.current = pathname
    closeMobileNav()
  }, [pathname, closeMobileNav])

  return null
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })
  const t = useTranslate()

  return (
    <LinkProvider component={RouterLink}>
      <AppShell
        height="auto"
        contentPadding={10}
        mobileNav={{ hasToggle: true, breakpoint: 'md' }}
        banner={
          <Banner
            status="info"
            container="section"
            title={t('app.banner.title')}
            description={t('app.banner.description')}
            isDismissable
          />
        }
        topNav={
          <TopNav
            label={t('app.nav.mainLabel')}
            heading={
              <TopNavHeading
                heading={t('app.brand.name')}
                subheading={t('app.brand.tagline')}
                logo={<NavIcon icon={<Icon icon={CodeBracketIcon} size="sm" />} />}
              />
            }
            endContent={<LanguageToggle />}
            startContent={
              <>
                {/* Icon supplies sizing; bare heroicons have no intrinsic size. */}
                <TopNavItem
                  label={t('app.nav.home')}
                  href="/"
                  icon={<Icon icon={HomeIcon} size="sm" />}
                  isSelected={pathname === '/'}
                />
                <TopNavItem
                  label={t('app.nav.about')}
                  href="/about"
                  icon={<Icon icon={UserIcon} size="sm" />}
                  isSelected={pathname === '/about'}
                />
              </>
            }
          />
        }
        sideNav={
          <SideNav>
            <SideNavSection title={t('app.nav.overviewSection')} isHeaderHidden>
              <SideNavItem
                label={t('app.nav.allProjects')}
                href="/projects"
                icon={CubeIcon}
                isSelected={pathname === '/projects'}
              />
            </SideNavSection>
            <SideNavSection title={t('app.nav.projectsSection')}>
              {PROJECTS.map((project) => (
                <SideNavItem
                  key={project.href}
                  label={project.label}
                  href={project.href}
                  icon={ArrowTurnDownRightIcon}
                  isSelected={pathname === project.href}
                />
              ))}
            </SideNavSection>
          </SideNav>
        }
      >
        <CloseMobileNavOnNavigate pathname={pathname} />
        {children}
        <SiteFooter />
      </AppShell>
    </LinkProvider>
  )
}
