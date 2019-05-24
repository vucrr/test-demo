import axios from 'axios'
import querystring from 'querystring'
import { ErrorLog } from './tools'

// 创建 axios 实例
const axiosServer = axios.create({
  timeout: 15000,
  transformRequest: [
    data => {
      return querystring.stringify(data)
    },
  ],
})

// request 拦截器
axiosServer.interceptors.request.use(
  config => {
    return config
  },
  error => {
    ErrorLog(`serverService interceptors request error -- ${error}`)
    // Promise.resolve(error)
  },
)

// response 拦截器
axiosServer.interceptors.response.use(
  res => {
    if (res.status === 200) {
      return res.data
    }
    return res
  },
  error => {
    const { request, response, code, message } = error
    if (request && response) {
      ErrorLog(
        `serverService interceptors response error -- response: ${response.status} ${
          response.statusText
        } ${JSON.stringify(response.data)}; request -- method: ${request.method}; path: ${request._headers &&
          request._headers.host}${request.path}; header: ${request._header}`,
      )
    } else {
      ErrorLog(`serverService interceptors response error -- code: ${code}, message: ${message}`)
    }
  },
)

export default axiosServer
