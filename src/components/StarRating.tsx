import { Icon } from '@astryxdesign/core/Icon'
import { HStack } from '@astryxdesign/core/Stack'
import { StarIcon } from '@heroicons/react/16/solid'
import { useTranslate } from '../i18n'

const MAX_STARS = 3

/** 1–3 star skill rating. */
export default function StarRating({ count }: { count: 1 | 2 | 3 }) {
  const t = useTranslate()

  return (
    <HStack
      gap={0.5}
      role="img"
      aria-label={t('app.skills.ratingLabel', { count })}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <Icon
          key={`star-${i}`}
          icon={StarIcon}
          size="sm"
          color={i < count ? 'accent' : 'disabled'}
        />
      ))}
    </HStack>
  )
}
