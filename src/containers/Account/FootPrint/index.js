import { checkLogin, redirectLogin } from 'actions/app'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Error from 'containers/Error'
import { fetchFootPrint } from 'actions/account/footprint'
import { Container, Header, TabBar } from 'components'
import Top from './Top'
import List from './List'

class FootPrint extends Component {
  static propTypes = {
    error: PropTypes.object,
    footprint: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  // 用于服务端请求数据
  static async getInitialProps({ store, query, isServer, res, asPath, req }) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(fetchFootPrint({ query, req }))
      if (data.status) {
        if (data.status === 401) {
          await redirectLogin({ isServer, res, asPath })
        }
        return { error: data }
      }
    }
    return false
  }

  state = {
    activeTab: 1,
  }

  handleTabChange = active => {
    this.setState({ activeTab: active })
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const fp = this.props.footprint
    const { activeTab } = this.state

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>信用足迹</Header>,
      renderTabBar: <TabBar selectedTab="myCenter" hidden />,
    }

    return (
      <Container {...containerProps}>
        <Top active={activeTab} onTabChange={this.handleTabChange} creditLevel={fp.get('credit_level')} />
        <List active={activeTab} honourCount={fp.get('honour_count')} breachCount={fp.get('breach_count')} />
      </Container>
    )
  }
}

// const mapDispatchToProps = dispatch => ({
//   onTasksActions: bindActionCreators(tasksActions, dispatch),
// })

const mapStateToProps = state => ({
  footprint: state.getIn(['account', 'footprint']),
})
export default connect(mapStateToProps)(FootPrint)
