import { Grid } from '@astryxdesign/core/Grid'
import { Heading } from '@astryxdesign/core/Heading'
import { Icon } from '@astryxdesign/core/Icon'
import { Card } from '@astryxdesign/core/Card'
import { HStack, VStack } from '@astryxdesign/core/Stack'
import { Text } from '@astryxdesign/core/Text'
import { StarIcon } from '@heroicons/react/16/solid'
import type { MessageKey } from '../../i18n'
import { useTranslate } from '../../i18n'
import StarRating from '../StarRating'

type Skill = { name: string; level: 1 | 2 | 3 }
type Category = { titleKey: MessageKey; skills: Skill[] }

const CATEGORIES: Category[] = [
  {
    titleKey: 'app.skills.languages',
    skills: [
      { name: 'TypeScript', level: 3 },
      { name: 'JavaScript', level: 3 },
      { name: 'C#', level: 2 },
      { name: 'SQL', level: 2 },
    ],
  },
  {
    titleKey: 'app.skills.frameworks',
    skills: [
      { name: 'React', level: 3 },
      { name: 'Tailwind CSS', level: 3 },
      { name: 'TanStack', level: 2 },
      { name: '.NET', level: 2 },
    ],
  },
  {
    titleKey: 'app.skills.tooling',
    skills: [
      { name: 'Git', level: 3 },
      { name: 'Docker', level: 2 },
      { name: 'Linux', level: 2 },
      { name: 'Figma', level: 1 },
    ],
  },
]

const LEGEND: Array<{ labelKey: MessageKey; count: 1 | 2 | 3 }> = [
  { labelKey: 'app.skills.legend1', count: 1 },
  { labelKey: 'app.skills.legend2', count: 2 },
  { labelKey: 'app.skills.legend3', count: 3 },
]

export default function SkillsSection() {
  const t = useTranslate()

  return (
    <VStack gap={6}>
      <Text type="large" color="secondary" justify="center" as="p">
        {t('app.skills.subtitle')}
      </Text>
      <Grid columns={{ minWidth: 250, max: 3 }} gap={4}>
        {CATEGORIES.map((category) => (
          <Card key={category.titleKey} variant="muted" padding={5}>
            <VStack gap={3}>
              <Heading level={3}>{t(category.titleKey)}</Heading>
              {category.skills.map((skill) => (
                <HStack key={skill.name} justify="between" vAlign="center">
                  <Text type="body">{skill.name}</Text>
                  <StarRating count={skill.level} />
                </HStack>
              ))}
            </VStack>
          </Card>
        ))}
      </Grid>
      <HStack gap={5} className="flex-wrap justify-center">
        {LEGEND.map(({ labelKey, count }) => (
          <HStack key={labelKey} gap={1.5} vAlign="center">
            <HStack gap={0.5} aria-hidden>
              {Array.from({ length: count }, (_, i) => (
                <Icon key={`legend-${i}`} icon={StarIcon} size="xsm" color="accent" />
              ))}
            </HStack>
            <Text type="supporting">{t(labelKey)}</Text>
          </HStack>
        ))}
      </HStack>
    </VStack>
  )
}
