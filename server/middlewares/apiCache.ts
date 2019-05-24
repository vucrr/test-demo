import apicache, { Options } from 'apicache'
import { Request } from 'express'

const REACT_APP_API_ENV = process.env.REACT_APP_API_ENV || 'dev'
const enabled = ['beta', 'prod'].includes(REACT_APP_API_ENV)

const config: Options = {
  debug: !enabled,
  enabled,
  defaultDuration: '1 minutes',
  statusCodes: {
    include: [200],
  },
  appendKey: (req: Request) => {
    // BFA
    if (req.headers.channelid) {
      return `channelid=${req.headers.channelid}`
    }
    // mobile_new
    if (!req.query.utm_source && req.cookies.utm_source) {
      return `utm=${req.cookies.utm_source}|${req.cookies.utm_medium || ''}|${req.cookies.utm_campaign || ''}`
    }
    return ''
  },
}

const instance = apicache.newInstance(config)

export default instance.middleware('5 minutes')
