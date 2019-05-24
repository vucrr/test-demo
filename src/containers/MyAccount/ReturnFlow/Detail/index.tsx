import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { payReturnFlow, returnFlowOrderActions } from 'actions/myAccount/returnflow/detail'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserDetail from './UserDetail'

interface DetailProps {
  orderdetail: any
  onPayReturnFlow: Function
  url: { query: any }
  isQsy: boolean
}

class Detail extends React.Component<DetailProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      await store.dispatch(returnFlowOrderActions({ query, req }))
    }
  }

  render() {
    const {
      orderdetail,
      url: { query },
      onPayReturnFlow,
      isQsy,
    } = this.props
    if (orderdetail.get('errorMsg')) {
      return <Error statusCode={orderdetail.get('status')} errorMsg={orderdetail.get('errorMsg')} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>还机详情</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <UserDetail isQsy={isQsy} orderdetail={orderdetail} query={query} onPayReturnFlow={onPayReturnFlow} />
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  orderdetail: state.getIn(['myAccount', 'returnflow', 'detail', 'return']),
  isQsy: state.getIn(['serverApp', 'utm', 'isQsy']),
})
const mapDispatchToProps = (dispatch: any) => ({
  onPayReturnFlow: bindActionCreators(payReturnFlow, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail)
