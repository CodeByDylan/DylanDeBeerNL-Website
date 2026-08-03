import { createFileRoute } from '@tanstack/react-router'
import { VStack } from '@astryxdesign/core/Stack'
import ContactSection from '../components/ContactSection'
import HeroSection from '../components/home/HeroSection'
import HighlightedProjectsSection from '../components/home/HighlightedProjectsSection'
import LatestProjectSection from '../components/home/LatestProjectSection'
import QnaSection from '../components/home/QnaSection'
import SectionDivider from '../components/home/SectionDivider'
import SkillsSection from '../components/home/SkillsSection'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  return (
    <VStack gap={0} maxWidth={1080} className="mx-auto w-full">
      <HeroSection />
      <SectionDivider labelKey="app.section.latestProject" />
      <LatestProjectSection />
      <SectionDivider labelKey="app.section.highlights" />
      <HighlightedProjectsSection />
      <SectionDivider labelKey="app.section.skills" />
      <SkillsSection />
      <SectionDivider labelKey="app.section.qna" />
      <QnaSection />
      <SectionDivider labelKey="app.section.contact" />
      <ContactSection />
    </VStack>
  )
}
