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
import RouterLink from './RouterLink'

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
            title="This site is a work in progress"
            description="Projects and write-ups are still being added."
            isDismissable
          />
        }
        topNav={
          <TopNav
            label="Main navigation"
            heading={
              <TopNavHeading
                heading="Dylan de Beer"
                subheading="also known as DutchyD"
                logo={<NavIcon icon={<Icon icon={CodeBracketIcon} size="sm" />} />}
              />
            }
            startContent={
              <>
                {/* Icon supplies sizing; bare heroicons have no intrinsic size. */}
                <TopNavItem
                  label="Home"
                  href="/"
                  icon={<Icon icon={HomeIcon} size="sm" />}
                  isSelected={pathname === '/'}
                />
                <TopNavItem
                  label="About Me"
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
            <SideNavSection title="Overview" isHeaderHidden>
              <SideNavItem
                label="All Projects"
                href="/projects"
                icon={CubeIcon}
                isSelected={pathname === '/projects'}
              />
            </SideNavSection>
            <SideNavSection title="Projects">
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
      </AppShell>
    </LinkProvider>
  )
}
