import { checkLogin } from 'actions/app'
import { checkWhiteList } from 'actions/myTrade/hunanMobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import Options from './Options'
import Package from './Package'
import styles from './index.less'

interface SelectPhoneNumberProps extends ErrorObject {
  data: any
}

class SelectPhoneNumber extends React.Component<SelectPhoneNumberProps> {
  static getInitialProps = async ({ query, store, res, isServer, asPath, req }: any) => {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(checkWhiteList({ req }))
      if (data && data.errorMsg) {
        return { error: data }
      }
      if (data.is_white === 0) {
        const goUrl = `/mytrade/hunanmobile/pick-number?go=${encodeURIComponent(query.go)}`
        if (res) {
          res.redirect(goUrl)
          res.end()
          return {}
        } else {
          await Router.replace(goUrl)
        }
      }
      return { data }
    }
  }

  render() {
    const { error } = this.props

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>选套餐手机号</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    const goUrl = (Router.router && Router.router.query && Router.router.query.go) || ''
    return (
      <Container {...containerProps} className={styles.container}>
        <Package show={true} />
        <Options goUrl={goUrl} phone={this.props.data.phone} />
      </Container>
    )
  }
}

export default connect()(SelectPhoneNumber)
