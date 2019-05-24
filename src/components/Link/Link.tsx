import Link from 'next/link'
import { stringify } from 'qs'
import React from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'

interface LinkProps {
  to: string | any
  children: any
  trackEvent?: TrackClickEventProperties
  className?: string
  native?: boolean
  target?: string
  replace?: boolean
}

const AppLink = ({ className, to = '', children, trackEvent, native, target, replace = false }: LinkProps) => {
  const nativeTo = to && to.pathname ? `${to.pathname}${stringify(to.query, { addQueryPrefix: true })}` : to
  if (trackEvent) {
    const handleTrackEvent = () => trackClickEvent(trackEvent)
    if (native) {
      return (
        <a href={nativeTo} className={className} onClick={handleTrackEvent}>
          {children}
        </a>
      )
    }
    return (
      <Link href={to} replace={replace}>
        <a className={className} onClick={handleTrackEvent}>
          {children}
        </a>
      </Link>
    )
  }

  if (native) {
    return (
      <a href={nativeTo} className={className} target={target}>
        {children}
      </a>
    )
  }

  return (
    <Link href={to} replace={replace}>
      <a className={className}>{children}</a>
    </Link>
  )
}

export default AppLink
