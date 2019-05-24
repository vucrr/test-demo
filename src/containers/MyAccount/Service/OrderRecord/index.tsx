import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as recordActions from 'actions/myAccount/service/order-record'
// import { Flex } from 'antd-mobile'
import { CSButtons, Container, Header, Icon, TabBar, Wrap } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { showActionSheet } from '../../../MyTrade/Assess/Result/StepList'
import Tab from '../Tab'
import CouponList from './CouponList'
import ItemBox from './ItemBox'
import styles from './ItemBox.less'
import Record from './Record'
import RentPriceBox from './RentPriceBox'
import ServiceBox from './ServiceBox'

interface OrderRecordProps extends ErrorObject {
  introduce: any
  query: {}
  listInfo: any
  onRecordActions: any
  orderDetail: any
}

const OrderRecord: NextSFC2<OrderRecordProps> = ({ error, listInfo, orderDetail, onRecordActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>下单记录</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const rentPriceBoxProps = {
    priceInfo: orderDetail.get('rent_info'),
  }

  const couponListProps = {
    couponList: orderDetail.get('coupon_info'),
  }

  const ServiceBoxProps = {
    list: orderDetail.get('vas_price_info'),
    priceInfo: orderDetail.get('rent_info'),
  }

  const advanceRentInfo = orderDetail.get('advance_rent_info')
  const rightIcon = (
    <div className={styles.count}>
      {`￥${advanceRentInfo.get('price')}`}
      <Icon className={styles.icon} type={require('svg/youjiantouxin.svg')} />
    </div>
  )
  const advanceRentBox = () => {
    if (advanceRentInfo.get('price')) {
      return [
        {
          title: '预付租金',
          content: rightIcon,
        },
      ]
    }
  }

  return (
    <Container {...containerProps}>
      <Tab initialPage={1} />
      <Wrap size="xl" bgColor="#fff" WhiteSpace={40}>
        <Record listInfo={listInfo} onRecordActions={onRecordActions} />
        <ItemBox title="下单信息">{orderDetail.get('trade_info').toJS()}</ItemBox>
        <CouponList {...couponListProps} />
        <RentPriceBox {...rentPriceBoxProps} />
        <ServiceBox {...ServiceBoxProps} />
        {advanceRentInfo.get('price') && (
          <ItemBox title="预付金费用" onClick={() => showActionSheet(advanceRentInfo.get('payment_detail'))}>
            {advanceRentBox()}
          </ItemBox>
        )}
        <ItemBox title="物流信息">{orderDetail.get('logistics_info').toJS()}</ItemBox>
        <CSButtons trackEvents={[TrackEventMyCenter.OnlineService, TrackEventMyCenter.PhoneService]} />
      </Wrap>
    </Container>
  )
}

OrderRecord.getInitialProps = async ({ store, query, req, isServer, res, asPath }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    await store.dispatch(recordActions.fetchInfo({ query, req }))
  }
}

const mapStateToProps = (state: any) => ({
  listInfo: state.getIn(['myAccount', 'service', 'orderRecord', 'list']),
  orderDetail: state.getIn(['myAccount', 'service', 'orderRecord', 'detail']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onRecordActions: bindActionCreators(recordActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderRecord)
