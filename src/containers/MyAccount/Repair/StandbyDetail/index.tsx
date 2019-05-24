import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { repairStandbyDetailActions } from 'actions/myAccount/repair/standby'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import * as React from 'react'
import { connect } from 'react-redux'
import Process from '../QualityDetail/Process'
import Service from '../QualityDetail/Service'
import Detail from './Detail'

export interface SrandbyDetailProps {
  detail: any
  logs: any
  error: any
}

export interface SrandbyDetailState {}

class SrandbyDetail extends React.Component<SrandbyDetailProps, SrandbyDetailState> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.sn) {
        await store.dispatch(repairStandbyDetailActions({ query, req }))
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
      renderHeader: <Header {...headerProps}>备用机详情</Header>,
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
  detail: state.getIn(['myAccount', 'repair', 'standby', 'detail']),
  logs: state.getIn(['myAccount', 'repair', 'standby', 'detail', 'logs']),
})

export default connect(mapStateToProps)(SrandbyDetail)
