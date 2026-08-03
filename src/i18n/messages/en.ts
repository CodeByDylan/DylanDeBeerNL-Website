/** English catalog — defines the message-key set for all locales. */
export const en = {
  // Brand
  'app.brand.name': 'Dylan de Beer',
  'app.brand.tagline': 'also known as DutchyD',

  // Navigation
  'app.nav.mainLabel': 'Main navigation',
  'app.nav.home': 'Home',
  'app.nav.about': 'About Me',
  'app.nav.overviewSection': 'Overview',
  'app.nav.projectsSection': 'Projects',
  'app.nav.allProjects': 'All Projects',

  // Banner
  'app.banner.title': 'This site is a work in progress',
  'app.banner.description': 'Projects and write-ups are still being added.',

  // Pages
  'app.projects.allTitle': 'All Projects',
  'app.page.empty': 'Nothing here yet.',

  // Astryx strings surfaced by this app; omitted keys fall back to shipped English.
  '@astryx.banner.dismiss': 'Dismiss',
  '@astryx.dialog.close': 'Close',
  '@astryx.appShell.mobileNavigation': 'Mobile navigation',
  '@astryx.mobileNav.navigation': 'Navigation',
  '@astryx.mobileNav.toggle.open': 'Open navigation',
  '@astryx.mobileNav.closeNavigation': 'Close navigation',
  '@astryx.sideNav.label': 'Side navigation',
  '@astryx.sideNav.heading.openMenu': 'Open menu',
  '@astryx.sideNav.heading.dialogLabel': 'Navigation menu',
  '@astryx.topNav.landmarkLabel': 'Top navigation',
  '@astryx.topNav.heading.openMenu': 'Open menu',
  '@astryx.topNav.heading.dialogLabel': 'Navigation menu',
} as const satisfies Record<string, string>

export type MessageKey = keyof typeof en
