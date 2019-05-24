import { NextSFC2 } from '@@types/next'
import * as buyOutActions from 'actions/account/buy-out'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BottomBox from './BottomBox'
import ItemBox from './ItemBox'
import Top from './Top'

interface BuyOutIndexProps extends ErrorObject {
  buyOut: any
  onBuyOutActions: any
  url: {
    query: {
      trade_no: string
    }
  }
}

// 轻松用买端页面
const BuyOutIndex: NextSFC2<BuyOutIndexProps> = ({ error, url, buyOut, onBuyOutActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>买断确认</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const info = buyOut.get('info')
  const tradeNo = url.query.trade_no

  const isHuabei = ['pis001', 'pis004', 'pis033'].includes(info.getIn(['trade_info', 'pis_code']))

  const topProps = {
    isHuabei,
    thumb: info.getIn(['sku_info', 'sku_img']),
    alias: info.getIn(['sku_info', 'sku_name']),
    rent: info.getIn(['price_info', 'choose_installments_num']),
  }

  const bottomBoxProps = {
    tradeNo,
    onBuyOutActions,
    buyout: info.get('buyout_info'),
    btnDisabled: buyOut.get('btnDisabled'),
  }

  return (
    <Container {...containerProps}>
      <Top {...topProps} />
      <ItemBox buyout={info.get('buyout_info')} />
      <BottomBox {...bottomBoxProps} />
    </Container>
  )
}

BuyOutIndex.getInitialProps = async ({ store, query, req }) => {
  if (query.trade_no) {
    const data = await store.dispatch(buyOutActions.fetchInfo({ trade_no: query.trade_no, req }))
    if (data.status) {
      return { error: data }
    }
  } else {
    return { error: { status: 500, errorMsg: '路由参数不合法' } }
  }
}

const mapStateToProps = (state: any) => ({
  buyOut: state.getIn(['account', 'buyOut', 'index']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onBuyOutActions: bindActionCreators(buyOutActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyOutIndex)
