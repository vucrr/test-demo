import { ModelFn } from '../interfaces/model'
import config from '../utils/config'
import Resource from '../utils/resource'

const configs = {
  appDownload: {
    method: Resource.GET,
    template: 'next-api/site/appdownload',
    baseUrl: config.host,
  },
  appDownloadProceed: {
    method: Resource.GET,
    template: 'next-api/site/appdownloadproceed',
    baseUrl: config.host,
  },
}

type SiteResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as SiteResource
