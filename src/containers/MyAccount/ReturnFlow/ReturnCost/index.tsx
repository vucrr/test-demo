import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { returnFlowCostActions } from 'actions/myAccount/returnflow/detail'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import UserMachine from './UserMachine'

interface ReturnProps {
  url: {
    query: {
      trade_no: string
      newExpress: boolean
    }
  }
  cost: any
}
class Return extends React.Component<ReturnProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      await store.dispatch(returnFlowCostActions({ query, req }))
    }
  }
  render() {
    const { cost } = this.props
    if (cost.get('errorMsg')) {
      return <Error statusCode={cost.get('status')} errorMsg={cost.get('errorMsg')} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}> 还机费用说明 </Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    // const trade_no = .trade_no
    return (
      <Container {...containerProps}>
        <UserMachine query={this.props.url.query} cost={this.props.cost} />
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  cost: state.getIn(['myAccount', 'returnflow', 'detail', 'cost']),
})
export default connect(mapStateToProps)(Return)
