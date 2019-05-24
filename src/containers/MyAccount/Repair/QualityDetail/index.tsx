import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { repairQualityDetailActions } from 'actions/myAccount/repair/quality'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import Detail from './Detail'
import Process from './Process'
import Service from './Service'

class QualityDetail extends React.Component<{ detail: any; logs: any; error: any }> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      // 维修详情页接受参数 sn=xxx || trade_no=xxx
      if (query.sn || query.trade_no) {
        await store.dispatch(repairQualityDetailActions({ query, req }))
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }
  render() {
    const { detail, logs, error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    } else if (detail && detail.get('errorMsg')) {
      return <Error statusCode={detail.get('status')} errorMsg={detail.get('errorMsg')} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>维修详情</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <Detail detail={detail} />
        <Process logs={logs} />
        <Service />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  detail: state.getIn(['myAccount', 'repair', 'quality', 'detail', 'main_data']),
  logs: state.getIn(['myAccount', 'repair', 'quality', 'detail', 'logs']),
})

export default connect(mapStateToProps)(QualityDetail)
