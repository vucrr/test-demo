import { GetInitialPropsContext } from '@@types/next'
import { checkLogin, redirectLogin } from 'actions/app'
import { fetchReturnPlan } from 'actions/myAccount/service/return-plan'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import * as React from 'react'
import { connect } from 'react-redux'
import Empty from '../Empty'
import Tab from '../Tab'
import List from './List'
import styles from './index.less'

interface ReturnPlanProps extends ErrorObject {}

interface InjectedProps {
  returnPlan: any
}

class ReturnPlan extends React.Component<ReturnPlanProps & InjectedProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ res, asPath, isServer }))
    if (isLogin) {
      const data = await store.dispatch(fetchReturnPlan({ query, req }))
      if (data.status) {
        if (data.status === 401) {
          await redirectLogin({ isServer, res, asPath })
        }
        return { error: data }
      }
    }
  }

  renderMain() {
    if (this.props.returnPlan.get('isPlanInfo')) {
      return <List item={this.props.returnPlan} />
    } else {
      return <Empty content="暂无还款计划" />
    }
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const containerProps = {
      renderHeader: <Header>还款计划</Header>,
      renderTabBar: <TabBar hidden={true} />,
      className: styles.bgcolor,
    }
    return (
      <Container {...containerProps}>
        <Tab initialPage={3} />
        {this.renderMain()}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  returnPlan: state.getIn(['myAccount', 'service', 'returnPlan']),
})

export default connect(mapStateToProps)(ReturnPlan)
