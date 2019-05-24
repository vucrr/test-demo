import { RouterRequest } from 'interfaces/router'

export interface HTTPInfra<Data> {
  status: number
  code?: number
  data: Data
  reason?: string
  msg?: string
}

export type HTTPInfraReturns<Data> = Promise<HTTPInfra<Data>>

export interface ModelFn {
  <Data>(req: RouterRequest): HTTPInfraReturns<Data>
}
