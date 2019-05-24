import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { repairQualityRecordActions } from 'actions/myAccount/repair/quality'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import RecordList from './Record'

class QualityRecord extends React.Component<{ url: any; count: number; detail: any; error: any }> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.trade_no) {
        await store.dispatch(repairQualityRecordActions({ query, req }))
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
      renderHeader: <Header {...headerProps}>维修记录</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <RecordList query={query} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  detail: state.getIn(['myAccount', 'repair', 'quality', 'data']),
})
export default connect(mapStateToProps)(QualityRecord)
