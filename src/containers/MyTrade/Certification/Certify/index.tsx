import { checkLogin } from 'actions/app'
import * as certify from 'actions/myTrade/certification'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'

interface Props extends ErrorObject {
  onCertify: any
}

let data: any
class Certify extends React.Component<Props, any> {
  static async getInitialProps({ store, query, res, isServer, asPath, req }: any) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      data = await store.dispatch(certify.getCertifyResult(query, req))
      if (data && data.errorMsg) {
        return { error: data }
      }
      await store.dispatch(certify.postUserIdentity({ token: data.token }, req))
      if (res) {
        res.redirect(data.redirect)
        res.end()
        return {}
      } else {
        await Router.push({ pathname: data.redirect })
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

export default Certify
