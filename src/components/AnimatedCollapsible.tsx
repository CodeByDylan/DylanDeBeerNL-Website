import { useId } from 'react'
import { useCollapsible } from '@astryxdesign/core/Collapsible'
import { Icon } from '@astryxdesign/core/Icon'
import { HStack } from '@astryxdesign/core/Stack'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

type AnimatedCollapsibleProps = {
  value: string
  trigger: React.ReactNode
  children: React.ReactNode
}

/**
 * Collapsible with animated expand/collapse. Astryx's Collapsible toggles
 * display:none, which cannot transition; this keeps content mounted and
 * animates grid rows. Group-coordinates through CollapsibleGroup via `value`.
 */
export default function AnimatedCollapsible({
  value,
  trigger,
  children,
}: AnimatedCollapsibleProps) {
  const contentId = useId()
  const { isOpen, toggle } = useCollapsible({ isCollapsible: true, value })

  return (
    <>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={toggle}
        className="w-full cursor-pointer border-none bg-transparent p-0 text-start"
      >
        <HStack justify="between" vAlign="center" paddingBlock={3} gap={3}>
          {trigger}
          <Icon
            icon={ChevronDownIcon}
            size="sm"
            color="secondary"
            className={`transition-transform duration-[var(--duration-fast)] ${isOpen ? 'rotate-180' : ''}`}
          />
        </HStack>
      </button>
      <span
        id={contentId}
        className={`grid transition-[grid-template-rows] duration-[var(--duration-medium)] ease-[var(--ease-standard)] ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <span className="block min-h-0 overflow-hidden">
          <span
            aria-hidden={!isOpen}
            className={`block pb-3 ${isOpen ? '' : 'invisible'}`}
          >
            {children}
          </span>
        </span>
      </span>
    </>
  )
}
