import { getBbfHeaders, getBfaHeaders, getQsyHeaders } from 'store/createStore'
import Resource from '../../server/utils/resource'

export const getHeaders = (req?: any) => {
  return req ? getBbfHeaders(req.headers.cookie, req.headers['user-agent']) : {}
}

export const getHeaders2 = (req?: any) => {
  if (req) return Resource.buildHeaders(req)
  // tslint:disable-next-line
  return typeof window !== 'undefined' ? getBfaHeaders() : {}
}

export const getHeaders3 = (req?: any) => {
  if (req) return getQsyHeaders(req)
  // tslint:disable-next-line
  return typeof window !== 'undefined' ? getQsyHeaders() : {}
}
