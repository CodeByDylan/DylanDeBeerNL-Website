import { Divider } from '@astryxdesign/core/Divider'
import { Text } from '@astryxdesign/core/Text'
import type { MessageKey } from '../../i18n'
import { useTranslate } from '../../i18n'

/** Labeled divider between homepage sections. */
export default function SectionDivider({ labelKey }: { labelKey: MessageKey }) {
  const t = useTranslate()

  return (
    <Divider
      className="py-10"
      label={
        <Text type="label" color="secondary" className="uppercase tracking-widest">
          {t(labelKey)}
        </Text>
      }
    />
  )
}
