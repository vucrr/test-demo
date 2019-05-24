import { isApp, isIOS } from 'utils/app'

export interface TrackClickEventProperties {
  category: string
  label: string
  value?: number
}

export function trackClickEvent(properties: TrackClickEventProperties) {
  try {
    if (isApp()) {
      // app内嵌 H5由 app 发送 piwik
      const piwikMsg = JSON.stringify({
        category: properties.category,
        action: 'Clicked',
        name: properties.label,
        value: properties.value || 1,
      })
      if (isIOS()) {
        window.webkit.messageHandlers.sendWebPiwikEvent &&
          window.webkit.messageHandlers.sendWebPiwikEvent.postMessage(piwikMsg)
      } else {
        window.jsObj.sendWebPiwikEvent && window.jsObj.sendWebPiwikEvent(piwikMsg)
      }
    } else {
      _paq.push(['trackEvent', properties.category, 'Clicked', properties.label, properties.value || 1])
    }
  } catch (e) {
    if (!(e instanceof ReferenceError)) throw e
  }
}
