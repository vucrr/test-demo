import axios from 'axios'
import { baseURL } from 'utils/config'
import { tools } from 'utils/index'

// 创建axios实例
const clientService = axios.create({
  baseURL,
  timeout: 15000,
  // headers: { 'Cache-Control': 'no-cache' },
})

// request 拦截器
clientService.interceptors.request.use(
  config => {
    // config.url += `?timestamp=${Math.round(new Date().getTime() / 1000)}`
    return config
  },
  error => {
    tools.ErrorLog(`clientService interceptors request error -- ${error}`)
    // return Promise.resolve(error)
  },
)

// response 拦截器
clientService.interceptors.response.use(
  response => {
    if (response.data.status && response.data.errorMsg) {
      return response
    }
    return response.data
  },
  error => {
    const { request, response, code, message } = error
    if (request && response) {
      tools.ErrorLog(
        `clientService interceptors response error -- response: ${response.status} ${
          response.statusText
        }; request -- method: ${request.method}; path: ${request._headers && request._headers.host}${
          request.path
        }; header: ${request._header}`,
      )
    } else {
      tools.ErrorLog(`clientService interceptors response error -- code: ${code}, message: ${message}`)
    }
    // return Promise.reject(error)
  },
)

export default clientService
