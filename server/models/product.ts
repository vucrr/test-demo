import { ModelFn } from '../interfaces/model'
import config from '../utils/config'
import Resource from '../utils/resource'

const configs = {
  getCategoryTags: {
    method: Resource.GET,
    template: 'v2c/getCategoryTags',
  },
  getCategoryProducts: {
    method: Resource.GET,
    template: 'v2c/getCategoryProducts',
  },
  getDetail: {
    method: Resource.GET,
    template: 'v2c/product/info',
  },
  getProperty: {
    method: Resource.GET,
    template: 'v2c/product/property',
  },
  getStock: {
    method: Resource.GET,
    template: 'v2/product/stock',
  },
  redirect: {
    method: Resource.POST,
    template: 'userOauth/saveRedirectUrl',
    baseUrl: config.host,
  },
  getIntroduce: {
    method: Resource.GET,
    template: 'next-api/product/introduce',
    baseUrl: config.host,
  },
  getVideoDetail: {
    method: Resource.GET,
    template: 'activity/productVideoDetail',
    baseUrl: config.host,
  },
  listComments: {
    method: Resource.GET,
    template: 'modelComment',
  },
  notice: {
    method: Resource.GET,
    template: 'user-subscribe',
  },
  BrandsTab: {
    method: Resource.GET,
    template: 'v2c/getBrandZoneDesc',
  },
  BrandsProduct: {
    method: Resource.GET,
    template: 'v2c/getBrandZoneProducts',
  },
}

type ProductResource = Resource & Record<keyof typeof configs, ModelFn>

export default new Resource(configs) as ProductResource
