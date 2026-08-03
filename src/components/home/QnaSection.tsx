import { Fragment } from 'react'
import { CollapsibleGroup } from '@astryxdesign/core/Collapsible'
import { Divider } from '@astryxdesign/core/Divider'
import { Section } from '@astryxdesign/core/Section'
import { Text } from '@astryxdesign/core/Text'
import type { MessageKey } from '../../i18n'
import { useTranslate } from '../../i18n'
import AnimatedCollapsible from '../AnimatedCollapsible'

const ITEMS: Array<{ q: MessageKey; a: MessageKey }> = [
  { q: 'app.qna.q1', a: 'app.qna.a1' },
  { q: 'app.qna.q2', a: 'app.qna.a2' },
  { q: 'app.qna.q3', a: 'app.qna.a3' },
  { q: 'app.qna.q4', a: 'app.qna.a4' },
  { q: 'app.qna.q5', a: 'app.qna.a5' },
]

export default function QnaSection() {
  const t = useTranslate()

  return (
    <Section padding={6} maxWidth={760} className="mx-auto w-full">
      <CollapsibleGroup type="single" defaultValue={ITEMS[0].q}>
        {ITEMS.map(({ q, a }, index) => (
          <Fragment key={q}>
            {index > 0 && <Divider />}
            <AnimatedCollapsible
              value={q}
              trigger={<Text type="label">{t(q)}</Text>}
            >
              <Text type="body" color="secondary" as="p" textWrap="pretty">
                {t(a)}
              </Text>
            </AnimatedCollapsible>
          </Fragment>
        ))}
      </CollapsibleGroup>
    </Section>
  )
}
