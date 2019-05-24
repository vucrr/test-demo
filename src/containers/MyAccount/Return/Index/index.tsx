import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as returnPhone from 'actions/myAccount/returnPhone'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import StoreItem from '../StoreList/StoreItem'
import Address from './Address'
import ExpressInfo from './ExpressInfo'
import Flow from './Flow'
import Form from './Form'
import ProductDetail from './ProductDetail'
import Success from './Success'
import Tabs from './Tabs'
import Tips from './Tips'

interface ReturnIndexProps {
  url: { query: { trade_no: string; region_id?: string; type?: string; via?: string } }
  price: any
  returnPhone: any
  chosenStore: any
  error: any
}

export enum ReturnVia {
  Store = 'store',
  Express = 'express',
}

enum ReturnType {
  Detail = 'detail',
  Save = 'save',
}

class ReturnIndex extends React.Component<ReturnIndexProps> {
  static async getInitialProps({ store, isServer, res, query, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const tradeNo = query.trade_no as string
      if (!tradeNo) {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
      const defers = []
      const isDetail = query.type === ReturnType.Detail
      if (isDetail) {
        defers.push(store.dispatch(returnPhone.getDetail(tradeNo, req)))
      } else {
        defers.push(store.dispatch(returnPhone.fetchPrices(tradeNo, req)))
        if (query.store_id) {
          const storeId = query.store_id as string
          defers.push(store.dispatch(returnPhone.getStore(storeId, req)))
        }
      }
      const res = await Promise.all(defers)
      if (res[0].status || (res[1] && res[1].status)) {
        return { error: res[0].data || (res[1] && res[1].data) }
      } else {
        if (res[1]) {
          return { chosenStore: res[1] }
        }
      }
    }
  }

  renderCore = (via: string) => {
    const tradeNo = this.props.url.query.trade_no
    const isDetail = this.props.url.query.type === ReturnType.Detail

    const { price, returnPhone } = this.props
    if (isDetail) {
      return (
        <>
          <Success
            via={via}
            endDate={price.get('end_date')}
            store={price.get('store_info')}
            onCancel={() => returnPhone.cancelApply(tradeNo)}
          />
          {via === ReturnVia.Store ? (
            <StoreItem editable={false} item={price.get('store_info')} />
          ) : (
            <ExpressInfo code={price.get('express_number')} />
          )}
        </>
      )
    } else {
      const store = this.props.chosenStore
      return (
        <>
          <Address via={via} tradeNo={tradeNo} store={store} />
          <Form via={via} returnPhone={returnPhone} tradeNo={tradeNo} storeId={store && store.store_id} />
        </>
      )
    }
  }

  render() {
    const { error, url } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const query = url.query
    const via = (function(price: any) {
      if (!query) return ReturnVia.Store
      else {
        if ('type' in query && query.type === ReturnType.Detail) {
          return price.get('return_type') === 1 ? ReturnVia.Store : ReturnVia.Express
        } else {
          if ('via' in query) {
            return query.via as string
          }
          return ReturnVia.Store
        }
      }
    })(this.props.price)
    const isDetail = (query && query.type) === ReturnType.Detail
    const containerProps = {
      renderHeader: <Header>还机{query && query.type === 'detail' ? '详情' : '申请'}</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        {!isDetail && <Tabs via={via} />}
        <Flow isDetail={isDetail} via={via} />
        {this.renderCore(via)}
        <ProductDetail price={this.props.price} />
        <Tips via={via} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  price: state.getIn(['myAccount', 'returnPhone', 'price']),
})

const mapDispatchToProps = (dispatch: any) => ({
  returnPhone: bindActionCreators(returnPhone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReturnIndex)
