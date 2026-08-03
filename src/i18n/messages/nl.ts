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

  // Section dividers
  'app.section.latestProject': 'Nieuwste project',
  'app.section.highlights': 'Uitgelichte projecten',
  'app.section.skills': 'Vaardigheden',
  'app.section.qna': 'Vraag & antwoord',
  'app.section.contact': 'Contact',

  // Hero
  'app.hero.kicker': 'Softwareontwikkelaar',
  'app.hero.title': 'Nette tools bouwen voor rommelige problemen.',
  'app.hero.subtitle':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'app.hero.ctaProjects': 'Bekijk projecten',
  'app.hero.ctaContact': 'Neem contact op',

  // Latest project
  'app.latest.badge': 'Nu in ontwikkeling',
  'app.latest.tagline': 'Een generieke ondertitel over de huidige focus.',
  'app.latest.body1':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'app.latest.body2':
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'app.latest.cta': 'Bekijk op GitHub',
  'app.latest.imageAlt': 'Voorbeeld van het Loom-project',

  // Q&A
  'app.qna.q1': 'Waarmee is deze website gebouwd?',
  'app.qna.a1':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'app.qna.q2': 'Ben je beschikbaar voor freelancewerk?',
  'app.qna.a2':
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'app.qna.q3': 'Mag ik je projecten in mijn eigen werk gebruiken?',
  'app.qna.a3':
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'app.qna.q4': 'Hoe kan ik een bug melden of een idee aandragen?',
  'app.qna.a4':
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'app.qna.q5': 'Waar kan ik je werk volgen?',
  'app.qna.a5':
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',

  // Highlighted projects
  'app.highlights.subtitle': 'Een generieke ondertitel bij geselecteerd werk.',
  'app.highlights.cardHint': 'Bekijk details',
  'app.project.loom.summary':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'app.project.rpi.summary':
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'app.project.web.summary':
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'app.projectDialog.tabOverview': 'Overzicht',
  'app.projectDialog.tabStack': 'Techniek',
  'app.projectDialog.tabLinks': 'Links',
  'app.projectDialog.stackIntro': 'Gebouwd met de volgende tools:',
  'app.projectDialog.repo': 'GitHub-repository',

  // Skills
  'app.skills.subtitle': 'Een generieke ondertitel over tools en ervaring.',
  'app.skills.languages': 'Talen',
  'app.skills.frameworks': 'Frameworks & bibliotheken',
  'app.skills.tooling': 'Tooling & platformen',
  'app.skills.legend1': 'Bekend mee',
  'app.skills.legend2': 'Bedreven',
  'app.skills.legend3': 'Expert',
  'app.skills.ratingLabel': '{count} van 3',

  // Contact
  'app.contact.title': 'Laten we praten',
  'app.contact.body':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'app.contact.email': 'Stuur een e-mail',
  'app.contact.github': 'GitHub-profiel',

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
