import { Link, type LinkProps } from '@tanstack/react-router'
import type { ComponentPropsWithoutRef } from 'react'

type RouterLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href?: string
}

/** LinkProvider adapter: maps Astryx's `href` to TanStack Router's `to`. */
export default function RouterLink({
  href,
  children,
  ...rest
}: RouterLinkProps) {
  const isInAppPath = href?.startsWith('/') && !href.startsWith('//')

  if (!isInAppPath) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href as LinkProps['to']} {...rest}>
      {children}
    </Link>
  )
}
