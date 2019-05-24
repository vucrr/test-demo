import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import { getCheckTradeCondition } from 'actions/myTrade/exchange/confirm'
import * as orderConfirmActions from 'actions/myTrade/order/confirm'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Cookies from 'js-cookie'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddressList from './AddressList'
import ProductBox from './ProductBox'
import RentPriceBox from './RentPriceBox'
import ServerBox from './ServiceBox'
import SubmitBottom from './SubmitBottom'
import WrapBox from './WrapBox'

export interface Query {
  contract_product_id: string
  vas_id?: string
  old_trade_no?: number
}

interface TradeConfirmProps extends ErrorObject {
  url: {
    query: Query
  }
  orderConfirm: any
  onOrderConfirmActions: any
  getCheckTradeCondition: any
}

const TradeConfirm: NextSFC2<TradeConfirmProps> = ({ error, url: { query }, orderConfirm, getCheckTradeCondition }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>确认换机订单</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const info = orderConfirm.get('info')
  const otherInfo = info.get('other_info')

  const addressListProps = {
    info: info.get('delivery_info'),
    store: info.get('store_info'),
  }

  const orderDetailProps = {
    sku_info: info.get('sku_info'),
    new_tips_info: info.get('new_tips_info'),
    old_tips_info: info.get('old_tips_info'),
  }

  const rentPriceBoxProps = {
    priceInfo: info.get('lease_price_info'),
    priceSchemeInfo: otherInfo.get('price_scheme_info'),
    couponList: info.get('coupon_info'),
    vasList: otherInfo.get('vas_list'),
    firstPerReduceInfo: info.get('first_per_reduce_info'),
  }

  const submitBottomProps = {
    hasAddress: !!info.get('delivery_info') && !!info.get('delivery_info').count(),
    agreeList: otherInfo.get('agreement_info'),
    new_debit_date: info.getIn(['new_tips_info', 'debit_date']),
    old_debit_date: info.getIn(['old_tips_info', 'debit_date']),
    query,
    getCheckTradeCondition: getCheckTradeCondition,
  }

  return (
    <Container {...containerProps}>
      <AddressList type="dark" {...addressListProps} />
      <WrapBox>
        <ProductBox {...orderDetailProps} />
        <RentPriceBox source="exchange" {...rentPriceBoxProps} />
        <ServerBox source="exchange" list={otherInfo.get('vas_list')} />
        <SubmitBottom {...submitBottomProps} />
      </WrapBox>
    </Container>
  )
}

TradeConfirm.getInitialProps = async ({ store, query, req, isServer, res, asPath }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(
      orderConfirmActions.fetchInfo({
        contract_product_id: query.contract_product_id,
        vas_id: query.vas_id,
        store_code: (req && req.cookies.store_code) || Cookies.get('store_code'),
        old_trade_no: query.old_trade_no,
        trade_type: 2, // 1正常订单 2换机订单
        req,
      }),
    )
    if (data.errorMsg) {
      return { error: data }
    }
  }
}

const mapStateToProps = (state: any) => ({
  orderConfirm: state.getIn(['myTrade', 'order', 'confirm']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onOrderConfirmActions: bindActionCreators(orderConfirmActions, dispatch),
  getCheckTradeCondition: bindActionCreators(getCheckTradeCondition, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeConfirm)
