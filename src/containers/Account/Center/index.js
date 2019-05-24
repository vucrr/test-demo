import { checkLogin, redirectLogin, redirectTo } from 'actions/app'
import React from 'react'
import { connect } from 'react-redux'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { centerActions } from 'actions/account/center'
import { cleanUserInfo } from 'utils/tools'
import Top from './Top'
import NavList from './NavList'
import RecommendList from './RecommendList'

class Center extends React.Component {
  static propTypes = {
    center: PropTypes.instanceOf(Immutable.Map).isRequired,
    error: PropTypes.object,
    utm: PropTypes.object,
  }

  static async getInitialProps({ store, query, isServer, res, asPath, req }) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath, req }))
    if (isLogin) {
      const data = await store.dispatch(centerActions({ query, req }))
      if (data.status) {
        if (data.status === 401) {
          await redirectLogin({ isServer, res, asPath })
        } else if (data.status === 301) {
          // 支付宝新用户，需要绑定手机号
          const path = '/account/choosephone?redirect_url=%2Faccount%2Fcenter'
          await redirectTo({ isServer, res, path })
        } else {
          return { error: data }
        }
      }
    }
    return false
  }

  componentDidMount() {
    const { error } = this.props
    if (error && error.status === 501) {
      cleanUserInfo()
    }
  }

  render() {
    const { error, utm } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const center = this.props.center
    const containerProps = {
      renderHeader: <Header hidden>个人中心</Header>,
      renderTabBar: <TabBar selectedTab="myCenter" />,
      fixedTabBar: true,
    }
    const showRecommendList = !utm.get('isCmblife') && !utm.get('isDxsh')

    return (
      <Container {...containerProps}>
        <Top userInfo={center.get('userInfo')} />
        <NavList showCredit={center.getIn(['userInfo', 'show_credit_entry'])} tradeCount={center.get('tradeCount')} />
        {showRecommendList && <RecommendList list={center.get('mpActivityInfo')} />}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  center: state.getIn(['account', 'center']),
  utm: state.getIn(['serverApp', 'utm']),
})

// const mapDispatchToProps = (dispatch) => ({
//   onHomeActions: bindActionCreators(centerActions, dispatch),
// })
export default connect(mapStateToProps)(Center)
