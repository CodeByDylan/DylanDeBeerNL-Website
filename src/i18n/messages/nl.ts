import type { MessageKey } from './en'

/** Dutch catalog. Total over MessageKey: missing translations fail typecheck. */
export const nl: Record<MessageKey, string> = {
  // Brand
  'app.brand.name': 'Dylan de Beer',
  'app.brand.tagline': 'ook bekend als DutchyD',

  // Navigation
  'app.nav.mainLabel': 'Hoofdnavigatie',
  'app.nav.home': 'Home',
  'app.nav.about': 'Over mij',
  'app.nav.overviewSection': 'Overzicht',
  'app.nav.projectsSection': 'Projecten',
  'app.nav.allProjects': 'Alle projecten',

  // Banner
  'app.banner.title': 'Deze site is nog in ontwikkeling',
  'app.banner.description': 'Projecten en artikelen worden nog toegevoegd.',

  // Pages
  'app.projects.allTitle': 'Alle projecten',
  'app.page.empty': 'Hier staat nog niets.',

  '@astryx.banner.dismiss': 'Sluiten',
  '@astryx.dialog.close': 'Sluiten',
  '@astryx.appShell.mobileNavigation': 'Mobiele navigatie',
  '@astryx.mobileNav.navigation': 'Navigatie',
  '@astryx.mobileNav.toggle.open': 'Navigatie openen',
  '@astryx.mobileNav.closeNavigation': 'Navigatie sluiten',
  '@astryx.sideNav.label': 'Zijnavigatie',
  '@astryx.sideNav.heading.openMenu': 'Menu openen',
  '@astryx.sideNav.heading.dialogLabel': 'Navigatiemenu',
  '@astryx.topNav.landmarkLabel': 'Bovennavigatie',
  '@astryx.topNav.heading.openMenu': 'Menu openen',
  '@astryx.topNav.heading.dialogLabel': 'Navigatiemenu',
}
