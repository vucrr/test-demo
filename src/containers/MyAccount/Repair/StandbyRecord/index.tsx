import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { repairStandbyRecordActions } from 'actions/myAccount/repair/standby'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import * as React from 'react'
import { connect } from 'react-redux'
import Record from './Record'
export interface StandbyRecordProps {
  url: { query: any }
  detail: any
  error: any
}

export interface StandbyRecordState {}

class StandbyRecord extends React.Component<StandbyRecordProps, StandbyRecordState> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.trade_no) {
        await store.dispatch(repairStandbyRecordActions({ query, req }))
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }
  render() {
    const { query } = this.props.url
    const { detail, error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    } else if (detail.get('errorMsg')) {
      return <Error statusCode={detail.get('status')} errorMsg={detail.get('errorMsg')} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>备用机记录</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <Record query={query} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  detail: state.getIn(['myAccount', 'repair', 'standby', 'data']),
})
export default connect(mapStateToProps)(StandbyRecord)
