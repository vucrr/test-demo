import { ErrorObject } from 'interfaces/error'
import { NextContext } from 'next'
import React from 'react'
import { Reducer, Unsubscribe } from 'redux'

export declare interface GetInitialPropsContext extends NextContext {
  store: {
    dispatch: Function
    getState(): any
    subscribe(listener: () => void): Unsubscribe
    replaceReducer(nextReducer: Reducer<T>): void
  }
  req: NextContext['req'] & {
    cookies: {
      user_id_v2: string
      userToken: string
      channelId: string
      store_code: string
    }
  }
  res: NextContext['res'] & {
    redirect: Function
  }
  query: any
  isServer: boolean
}

export declare interface NextSFC2<T> extends React.FunctionComponent<T> {
  getInitialProps?: (ctx: GetInitialPropsContext) => Promise<T | ErrorObject | void>
}

export declare class NextComponent<T> extends React.ComponentClass<T> {
  static getInitialProps?: (ctx: Partial<GetInitialPropsContext>) => Promise<T | void>
}
