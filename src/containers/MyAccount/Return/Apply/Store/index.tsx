import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as storeAction from 'actions/myAccount/return/apply/store'
import { getStore } from 'actions/myAccount/returnPhone'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeadTab from '../HeadTab'
import OrderInfo from '../OrderInfo'
import Tips from '../Tips'
import Address from './Address'
import Btn from './Btn'
import Result from './Result'

interface StoreProps extends ErrorObject {
  detailInfo: any
  query: any
  chosenStore: any
  onStoreAction: any
  orderType: number // 订单类型 1、商品订单 2、换机订单
}

class Store extends React.Component<StoreProps> {
  static getInitialProps = async ({ query, store, isServer, res, asPath, req }: GetInitialPropsContext) => {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const defers = []
      const isDetail = query.sub_trade_no // 判断是否详情页
      defers.push(store.dispatch(storeAction.fetchDetail(query, req)))
      if (!isDetail && query.store_id) {
        const storeId = query.store_id as string
        defers.push(store.dispatch(getStore(storeId, req)))
      }
      const res = await Promise.all(defers)
      if (res[0].errorMsg || (res[1] && res[1].status)) {
        return { error: res[0] || (res[1] && res[1]) }
      } else {
        if (res[1]) {
          return { chosenStore: res[1], orderType: res[0].trade_type }
        }
        return { orderType: res[0].trade_type }
      }
    }
  }

  render() {
    const { error, onStoreAction, detailInfo, query, chosenStore, orderType } = this.props
    const isDetailPage = Boolean(query.sub_trade_no) // 是否详情页
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const containerProps = {
      renderHeader: <Header>{isDetailPage ? '门店还机详情' : '还机申请'}</Header>,
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    const data = detailInfo
    const storeInfo = !isDetailPage ? chosenStore : data.get('store_info') && data.get('store_info').toJS()
    return (
      <Container {...containerProps}>
        <HeadTab showTab={!isDetailPage && orderType === 1} data={data} query={query} />
        {isDetailPage && (
          <Result
            cancel={onStoreAction.cancelReturn}
            data={data}
            storeInfo={storeInfo}
            query={query}
            orderType={orderType}
          />
        )}
        <Address storeInfo={storeInfo} query={query} isDetailPage={isDetailPage} />
        <OrderInfo data={data} />
        <Tips via="store" />
        {!isDetailPage && <Btn enabled={chosenStore} onSubmit={onStoreAction.applyReturn} data={data} query={query} />}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  detailInfo: state.getIn(['myAccount', 'returnApply', 'store', 'detail']),
})

const mapDispatch = (dispatch: any) => ({
  onStoreAction: bindActionCreators(storeAction, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatch,
)(Store)
