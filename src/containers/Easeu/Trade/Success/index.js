import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Error from 'containers/Error'
import * as tradeActions from 'actions/easeu/trade'
import { Container, Header } from 'components'
import Content from './Content'
import ProductBox from '../Index/ProductBox'

const TradeSuccess = ({ error, success }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>订单结果</Header>,
  }

  const isHuabei = ['pis001', 'pis004', 'pis033'].includes(success.getIn(['trade_info', 'pis_code']))

  const productBoxProps = {
    thumb: success.getIn(['sku_info', 'sku_img']),
    alias: success.getIn(['sku_info', 'sku_name']),
    rent: success.getIn(['trade_info', 'choose_installments_num']),
  }

  return (
    <Container {...containerProps}>
      <Content isHuabei={isHuabei} />
      <ProductBox {...productBoxProps} />
    </Container>
  )
}

TradeSuccess.propTypes = {
  error: PropTypes.object,
  success: PropTypes.instanceOf(Immutable.Map).isRequired,
  // onTradeActions: PropTypes.object.isRequired,
}

TradeSuccess.getInitialProps = async ({ store, query, isServer, res, req }) => {
  if (query.flow_code) {
    const response = await store.dispatch(tradeActions.checkFlow({ query, req }))
    if (response.status) {
      return { error: response }
    }
    if (response.url && response.url !== `/easeu/trade/success/${query.flow_code}`) {
      if (isServer) {
        res.redirect(response.url)
        res.end()
      } else {
        window.location.href = response.url
      }
    } else if (response.pass === 0) {
      // 尚卡未支付
      const redirectUrl = `/easeu/trade/index/${query.flow_code}`
      if (isServer) {
        res.redirect(redirectUrl)
        res.end()
      } else {
        window.location.href = redirectUrl
      }
      return {}
    }
    const res2 = await store.dispatch(tradeActions.fetchSuccessInfo({ query, req }))
    if (res2 && res2.status) {
      return { error: res2 }
    }
    return {}
  }
  return { error: { status: 404, errorMsg: '' } }
}

const mapStateToProps = state => ({
  success: state.getIn(['easeu', 'trade', 'success']),
})

const mapDispatchToProps = dispatch => ({
  onTradeActions: bindActionCreators(tradeActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeSuccess)
