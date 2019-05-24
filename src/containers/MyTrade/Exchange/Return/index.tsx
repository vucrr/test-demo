import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { FetchStore, fetchReplaceReturn, saveReplaceReturn, saveTab } from 'actions/myTrade/exchange/return'
import { createStrategyPay } from 'actions/myTrade/order/pay'
import { Container, Header, TabBar } from 'components'
import { withLoadingProps } from 'components/withLoading'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductInfo from './ProductInfo'
import ReturnTypeBox from './ReturnTypeBox'
import WrapBox from './WrapBox'
import styles from './WrapBox.less'

interface ExchangeReturnProps {
  return: any
  onSaveReplaceReturn: Function
  onFetchStore: Function
  url: any
  error: any
  onCreateStrategyPay: Function
  onSaveTab: Function
  tab: number
}
interface ExchangeReturnState {}
class ExchangeReturn extends React.Component<ExchangeReturnProps & withLoadingProps, ExchangeReturnState> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.old_trade_no) {
        const res = await store.dispatch(
          fetchReplaceReturn({ query: { old_trade_no: query.old_trade_no, trade_type: 2 }, req }),
        )
        if (res.errorMsg) {
          return { error: res }
        }
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }
  render() {
    const { error, tab } = this.props
    if (error && error.errorMsg) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>选择旧机还机方式</Header>,
      renderTabBar: <TabBar hidden={true} />,
      className: styles.bgcolor,
    }
    return (
      <Container {...containerProps}>
        <p className={styles.prompt}>您需要先选择旧机还机方式，再去下单新机</p>
        <WrapBox title="请确认还机信息">
          <ProductInfo info={this.props.return.get('trade_info')} />
        </WrapBox>
        <WrapBox title="请选择还机方式">
          <ReturnTypeBox
            info={this.props.return.get('trade_info')}
            onFetchStore={this.props.onFetchStore}
            onSaveReplaceReturn={this.props.onSaveReplaceReturn}
            query={this.props.url.query}
            onSaveTab={this.props.onSaveTab}
            tab={tab}
          />
        </WrapBox>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  return: state.getIn(['myTrade', 'exchange', 'exchangeReturn', 'return']),
  tab: state.getIn(['myTrade', 'exchange', 'exchangeReturn', 'tab']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onSaveReplaceReturn: bindActionCreators(saveReplaceReturn, dispatch),
  onFetchStore: bindActionCreators(FetchStore, dispatch),
  onCreateStrategyPay: bindActionCreators(createStrategyPay, dispatch),
  onSaveTab: bindActionCreators(saveTab, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeReturn)
