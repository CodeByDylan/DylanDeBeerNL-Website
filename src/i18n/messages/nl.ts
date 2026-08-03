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

  // Shared actions
  'app.action.back': 'Ga terug',
  'app.action.home': 'Naar home',

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

  // Footer
  'app.footer.tagline': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'app.footer.rights': '© {year} Dylan de Beer. Alle rechten voorbehouden.',
  'app.footer.cookies': 'Cookieverklaring',

  // Cookie statement
  'app.cookies.title': 'Cookieverklaring',
  'app.cookies.updated': 'Laatst bijgewerkt: augustus 2026',
  'app.cookies.intro':
    'Kort gezegd: deze website plaatst geen cookies, toont geen advertenties en volgt je niet over andere websites. Er wordt niets op je apparaat opgeslagen totdat je zelf een instelling wijzigt.',

  'app.cookies.none.title': 'Gebruikt deze site cookies?',
  'app.cookies.none.body':
    'Nee — geen eigen cookies en geen cookies van derden. Een pagina openen slaat niets op je apparaat op.',

  'app.cookies.stored.title': 'Wat deze site op je apparaat opslaat',
  'app.cookies.stored.body':
    'Eén item, en alleen zodra je zelf van taal wisselt. Je keuze blijft in je browser bewaard, zodat de site bij je volgende bezoek in die taal staat.',
  'app.cookies.stored.nameLabel': 'Naam',
  'app.cookies.stored.nameValue': 'locale (lokale opslag in je browser, geen cookie)',
  'app.cookies.stored.purposeLabel': 'Doel',
  'app.cookies.stored.purposeValue': 'Onthoudt de taal die je hebt gekozen',
  'app.cookies.stored.contentLabel': 'Inhoud',
  'app.cookies.stored.contentValue': 'Alleen "en" of "nl"',
  'app.cookies.stored.retentionLabel': 'Bewaard tot',
  'app.cookies.stored.retentionValue': 'Je de gegevens van deze site in je browser wist',
  'app.cookies.stored.sentLabel': 'Naar een server verstuurd?',
  'app.cookies.stored.sentValue': 'Nee, het blijft in je browser',

  'app.cookies.analytics.title': 'Bezoekersstatistieken',
  'app.cookies.analytics.body':
    'Bezoeken worden geteld met Vercel Web Analytics. Dat werkt zonder cookies en slaat niets op je apparaat op. Er worden geaggregeerde gegevens vastgelegd, zoals de bekeken pagina, de site waar je vandaan kwam, de globale locatie (land en regio), browser en apparaattype. Terugkerend bezoek wordt maximaal 24 uur herkend via een waarde die uit het verzoek zelf wordt afgeleid en daarna niet wordt bewaard. Deze statistieken kunnen jou niet identificeren en worden niet gebruikt voor advertenties of profilering.',

  'app.cookies.consent.title': 'Waarom er geen cookiebanner is',
  'app.cookies.consent.body':
    'Europese en Nederlandse regels vereisen toestemming voordat er informatie op je apparaat wordt opgeslagen of uitgelezen, tenzij dat strikt noodzakelijk is voor iets wat je zelf hebt gevraagd. De taalvoorkeur wordt alleen bewaard omdat jij die hebt gekozen, en de bezoekersstatistieken slaan helemaal niets op je apparaat op. Voor geen van beide is jouw toestemming nodig, dus een cookiebanner zou je om instemming met niets vragen.',

  'app.cookies.control.title': 'Jouw keuzes',
  'app.cookies.control.body':
    'Je kunt de bewaarde taalvoorkeur altijd verwijderen door de gegevens van deze site in je browserinstellingen te wissen. De site blijft gewoon werken en valt terug op Engels. Opslag voor deze site volledig blokkeren kan ook — je verliest dan alleen de onthouden taal.',

  'app.cookies.changes.title': 'Als dit verandert',
  'app.cookies.changes.body':
    'Mocht deze site ooit cookies of tracking gaan gebruiken, dan wordt deze pagina eerst bijgewerkt en wordt toestemming gevraagd waar de wet dat vereist.',

  'app.cookies.contact.title': 'Vragen',
  'app.cookies.contact.body':
    'Is iets hier onduidelijk, of wil je weten wat er over je bezoek is vastgelegd? Neem contact op:',

  // Not found & error pages
  'app.notFound.title': 'Pagina niet gevonden',
  'app.notFound.body':
    'Deze pagina bestaat niet of is verplaatst. Ga terug naar waar je vandaan kwam, of begin opnieuw op de homepagina.',
  'app.error.title': 'Er ging iets mis',
  'app.error.body':
    'Er is een onverwachte fout opgetreden. Ga terug naar waar je vandaan kwam, of begin opnieuw op de homepagina.',

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
