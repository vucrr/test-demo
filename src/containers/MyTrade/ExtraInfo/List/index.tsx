import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchInfo } from 'actions/myTrade/extraInfo/index'
import { createStrategyPay } from 'actions/myTrade/order/pay'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ButtonBox from './ButtonBox'
// import { bindActionCreators } from 'redux'
import InfoList from './InfoList'

export interface ExreaListQuery {
  trade_no: string // 订单号
  pay_no?: string // 支付单号
  type?: string //   支付步骤
  pis_code?: string // 担保方式code
}

interface ExtraInfoProps extends ErrorObject {
  extraInfo: any
  query: ExreaListQuery
  onCreateStrategyPay: (params: ExreaListQuery) => any
}

class ExtraInfo extends React.Component<ExtraInfoProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(fetchInfo({ query, req }))
      if (data.status) {
        return { error: data }
      }
    }
  }

  render() {
    const { error, query, extraInfo, onCreateStrategyPay } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>补充资料</Header>,
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    return (
      <Container {...containerProps}>
        <InfoList query={query} list={extraInfo.get('step_list')} />
        <ButtonBox query={query} list={extraInfo.get('step_list')} onCreateStrategyPay={onCreateStrategyPay} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  extraInfo: state.getIn(['myTrade', 'extraInfo', 'list']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCreateStrategyPay: bindActionCreators(createStrategyPay, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExtraInfo)
