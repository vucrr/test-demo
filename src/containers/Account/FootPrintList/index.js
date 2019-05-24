import { checkLogin, redirectLogin } from 'actions/app'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { connect } from 'react-redux'
import Error from 'containers/Error'
import { fetchFootPrintList } from 'actions/account/footprint'
import { Container, Header, TabBar } from 'components'
import styles from './Index.less'

class FootPrintList extends Component {
  static propTypes = {
    error: PropTypes.object,
    footprintList: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  // 用于服务端请求数据
  static async getInitialProps({ store, query, isServer, res, asPath, req }) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, req, asPath }))
    if (isLogin) {
      const data = await store.dispatch(fetchFootPrintList({ query, req }))
      if (data.status) {
        if (data.status === 401) {
          await redirectLogin({ isServer, res, asPath })
        }
        return { error: data }
      }
    }
    return false
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const list = this.props.footprintList.get('breach_info')
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>违约记录</Header>,
      renderTabBar: <TabBar selectedTab="myCenter" hidden />,
    }
    return (
      <Container {...containerProps}>
        <ul className={styles.box}>
          {list.map((item, index) => {
            return (
              <li key={index} className={styles.lists}>
                <span>逾期</span>
                <span>{item}</span>
              </li>
            )
          })}
        </ul>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  footprintList: state.getIn(['account', 'footprintList']),
})
export default connect(mapStateToProps)(FootPrintList)
