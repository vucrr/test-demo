import { IncomingHttpHeaders } from 'http'
import { QueryStringMapObject } from 'next'

interface Cookies {
  user_id_v2: string
  userToken: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  channelId: string
  store_code: string
}

// 暂时统一 interface，用于 extends
export interface RouterRequest {
  headers: IncomingHttpHeaders
  query: any
  cookies?: Partial<Cookies>
  params?: any
  body?: any
}

export interface ClientRequest {
  isServer?: boolean
  query: QueryStringMapObject
  req?: any
}
