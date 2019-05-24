import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as orderConfirmActions from 'actions/myTrade/order/confirm'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AddressList from './AddressList'
import Box from './Box'
import CouponList from './CouponList'
import NoticeBar from './NoticeBar'
import ProductBox from './ProductBox'
import RentPriceBox from './RentPriceBox'
import ServerBox from './ServiceBox'
import SubmitBottom from './SubmitBottom'
import styles from './index.less'

export interface Query {
  contract_product_id: string
  vas_id?: string
  exchange?: boolean
  trade_type?: number
  old_trade_no?: number
}

interface TradeConfirmProps extends ErrorObject {
  url: {
    query: Query
  }
  orderConfirm: any
  onOrderConfirmActions: any
  exchange: any
}

const TradeConfirm: NextSFC2<TradeConfirmProps> = ({ error, url: { query }, orderConfirm, onOrderConfirmActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }
  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>确认订单</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const info = orderConfirm.get('info')
  const otherInfo = info.get('other_info')

  const addressListProps = {
    info: info.get('delivery_info'),
    store: info.get('store_info'),
  }

  const productBoxProps = {
    thumb: info.getIn(['sku_info', 'sku_img_url']),
    alias: info.getIn(['sku_info', 'sku_name']),
  }

  const couponListProps = {
    couponList: info.get('coupon_info'),
  }

  const ServerBoxProps = {
    list: otherInfo.get('vas_list'),
    priceInfo: info.get('lease_price_info'),
  }

  const rentPriceBoxProps = {
    priceInfo: info.get('lease_price_info'),
  }

  const submitBottomProps = {
    hasAddress: !!info.get('delivery_info') && !!info.get('delivery_info').count(),
    agreeList: otherInfo.get('agreement_info'),
    onOrderConfirmActions,
    query,
  }

  return (
    <Container {...containerProps} className={styles.trade_confirm}>
      {otherInfo.getIn(['tips_info', 'tips_type']) > 0 && <NoticeBar info={otherInfo.get('tips_info')} />}
      <AddressList {...addressListProps} />
      <ProductBox {...productBoxProps} />
      <CouponList {...couponListProps} />
      <RentPriceBox {...rentPriceBoxProps} />
      <ServerBox {...ServerBoxProps} />
      <Box classNames={styles.promise}>
        <span>发货前可取消订单</span>
        <span>7天无理由退货</span>
        <span>15天包换</span>
      </Box>
      <SubmitBottom {...submitBottomProps} />
    </Container>
  )
}

TradeConfirm.getInitialProps = async ({ store, query, req, isServer, res, asPath }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath, req }))
  if (isLogin) {
    const data = await Promise.all([
      store.dispatch(
        orderConfirmActions.fetchInfo({
          contract_product_id: query.contract_product_id,
          vas_id: query.vas_id,
          store_code: (req && req.cookies.store_code) || Cookies.get('store_code'),
          req,
        }),
      ),
      store.dispatch(
        orderConfirmActions.fetchExchange(
          {
            contract_product_id: query.contract_product_id, // 合约商品ID
            old_trade_no: '', // 订单号
          },
          req,
        ),
      ),
    ])

    if (data[1].errorMsg) {
      return { error: data[1] }
    }
    if (data[0].errorMsg) {
      return { error: data[0] }
    }
    if (data[1].is_replace_role && !query.no_replace) {
      if (isServer) {
        res.redirect(
          '/mytrade/exchange?contract_product_id=' + query.contract_product_id + '&vas_id=' + query.vas_id || '',
        )
        res.end()
      } else {
        await Router.push({
          pathname: '/mytrade/exchange',
          query: { contract_product_id: query.contract_product_id, vas_id: query.vas_id || '' },
        })
      }
    }
  }
}

const mapStateToProps = (state: any) => ({
  orderConfirm: state.getIn(['myTrade', 'order', 'confirm']),
  exchange: state.getIn(['myTrade', 'order', 'confirm', 'exchange']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onOrderConfirmActions: bindActionCreators(orderConfirmActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeConfirm)
