import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as returnPhone from 'actions/myAccount/returnPhone'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Content from './Content'

interface ReturnResultProps {
  error: any
  price: any
}

const ReturnResult: NextSFC2<ReturnResultProps> = (props: ReturnResultProps) => {
  const containerProps = {
    renderHeader: <Header>还机费用说明</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const { error } = props
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  return (
    <Container {...containerProps}>
      <Content price={props.price} />
    </Container>
  )
}

ReturnResult.getInitialProps = async ({ store, query, isServer, res, asPath, req }: any) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const tradeNo = query.trade_no as string
    if (!tradeNo) {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
    const data = await store.dispatch(returnPhone.fetchPrices(tradeNo, req))
    if (data.errorMsg) {
      return { error: data }
    }
    // 直接跳过该页面
    const pageUrl = `/myaccount/return?trade_no=${query.trade_no}`
    if (['26', '28'].includes(data.trade_info.status)) {
      res.redirect(pageUrl + '&type=detail')
      res.end()
    } else if (!data.return_price.unpaid_plan_amount) {
      res.redirect(pageUrl + '&type=save')
      res.end()
    }
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
)(ReturnResult)
