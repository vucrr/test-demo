import { NextSFC2 } from '@@types/next'
import * as buyOutActions from 'actions/myAccount/service/buy-out'
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

// 享换机买端页面
const BuyOutIndex: NextSFC2<BuyOutIndexProps> = ({ error, url, buyOut, onBuyOutActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const tradeNo = url.query.trade_no

  const containerProps = {
    renderHeader: <Header>买断确认</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const topProps = {
    isHuabei: !buyOut.get('isCredit'),
    thumb: buyOut.get('skuImg'),
    alias: buyOut.get('skuName'),
    rent: buyOut.get('used_months'),
  }

  const bottomBoxProps = {
    tradeNo,
    onBuyOutActions,
    buyout: buyOut,
  }

  return (
    <Container {...containerProps}>
      <Top {...topProps} />
      <ItemBox buyout={buyOut} />
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
  buyOut: state.getIn(['myAccount', 'service', 'buyOut', 'index']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onBuyOutActions: bindActionCreators(buyOutActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BuyOutIndex)
