import { AxiosRequestConfig } from 'axios'
import { Request } from 'express'
import isEmpty from 'lodash.isempty'
// import omit from 'lodash.omit'
import querystring from 'querystring'
import { RouterRequest } from '../interfaces/router'
import axiosInstance from './axiosServer'
import appConfig from './config'
import { RSAType, rasPrivateKeySign } from './crypto'
import { ErrorLog, dictSort, getPlatform } from './tools'

interface Spec {
  method: string
  template: string
  baseUrl?: string
}

type Specs = {
  [index: string]: Spec
}

interface RequestConfig extends Pick<Spec, Exclude<keyof Spec, 'template'>>, RouterRequest {
  url: string
  body?: any
}

export default class Resource {
  [index: string]: any

  static GET = 'get'
  static POST = 'post'
  static PUT = 'put'
  static DELETE = 'delete'

  constructor(specs: Specs) {
    Object.keys(specs).forEach(key => {
      const spec = specs[key]
      this[key] = this.actionBuilder(spec)
    })
  }

  static setRequestConfig(c: RequestConfig): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      method: c.method,
      url: c.url,
      baseURL: c.baseUrl || appConfig.host2,
    }
    if (c.query && !isEmpty(c.query)) {
      // config.params = omit(c.query, 'timestamp')
      config.params = c.query
    }

    if (c.body && !isEmpty(c.body)) {
      config.data = c.body
    }

    if (c.headers && !isEmpty(c.headers)) {
      if (c.baseUrl === appConfig.host) {
        config.headers = {
          'user-agent': c.headers['user-agent'],
          cookie: c.headers.cookie || '',
        }
      } else if ([appConfig.host2, appConfig.host3].includes(c.baseUrl!)) {
        // Doc in http://code.aihuishou.com/airent/doc/issues/320
        // All header names are lower cased in axios
        const timestamp = Math.floor(Date.now() / 1000)
        config.headers = {
          timestamp,
          sign: rasPrivateKeySign({
            origin: decodeURIComponent(querystring.stringify(dictSort({ ...c.body, ...c.query, timestamp }))),
            type: RSAType.SHA256,
            privateKeyPath: appConfig.rsaKeyForBFA.private,
          }),
          userToken: c.headers.usertoken || '',
          userIdV2: c.headers.useridv2 || '',
          channelId: c.headers.channelid || '',
          platform: c.headers.platform || '',
          utmSource: c.headers.utmsource || '',
          utmMedium: c.headers.utmmedium || '',
          utmCampaign: c.headers.utmcampaign || '',
        }
        if (!c.headers.platform) {
          ErrorLog(
            `警告: api ${c.baseUrl}${c.url} 在服务端请求时缺少req参数, 请在getInitialProps中添加！: ${JSON.stringify(
              c.headers,
            )}`,
          )
        }
        // console.log('[config.headers]', config.params, config.headers)
      } else {
        config.headers = c.headers
      }
    }
    return config
  }

  private actionBuilder({ template, method, baseUrl = appConfig.host2 }: Spec) {
    const buildUrl = this.getUrlBuilder(template)
    return (params: RouterRequest) => {
      const url = buildUrl(params.query)
      const config = Resource.setRequestConfig({ ...params, url, method, baseUrl })
      return axiosInstance.request(config)
    }
  }

  private getUrlBuilder(template: string) {
    return (query: any) => {
      if (!query) return template
      Object.keys(query).map(item => {
        if (template.includes(':' + item)) {
          template = template.replace(':' + item, query[item])
        }
      })
      return template
    }
  }

  static buildHeaders(req: Request, lowercase = false) {
    const headers: { [key: string]: string } = {
      userToken: decodeURIComponent(req.cookies.userToken || ''),
      userIdV2: decodeURIComponent(req.cookies.user_id_v2 || ''),
      channelId: req.cookies.channelId || '0',
      platform: getPlatform(req.useragent!.source),
      utmSource: req.query.utm_source || req.cookies.utm_source || '',
      utmMedium: req.query.utm_medium || req.cookies.utm_medium || '',
      utmCampaign: req.query.utm_campaign || req.cookies.utm_campaign || '',
    }

    if (lowercase) {
      const result: { [key: string]: string } = {}
      Object.keys(headers).forEach(key => (result[key.toLocaleLowerCase()] = headers[key]))
      return result
    } else {
      return headers
    }
  }
}
