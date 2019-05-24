import { IncomingMessage } from 'http'

export interface Utm {
  [index: string]: {
    utm_source: string
    utm_medium: string
    utm_campaign: string
  }
}

export interface CacheObject extends IncomingMessage {
  query: any
  params: any
  url: string
  path: string
  cookies: Utm
}
