import { checkLogin } from 'actions/app'
import * as certify from 'actions/myTrade/certification'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'

class Zmxy extends React.Component<ErrorObject, any> {
  static async getInitialProps({ query, store, res, isServer, asPath, req }: any) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(certify.postCertifyUrl({ query, res, isServer, req }))
      if (data && data.errorMsg) {
        return { error: data }
      }
    }
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    return <div />
  }
}

export default Zmxy
