import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { noop } from 'utils/tools'
import Error from 'containers/Error'
import * as tradeActions from 'actions/easeu/trade'
import { Container, Header } from 'components'
import Marquee from './Marquee'
import ProductBox from './ProductBox'
import HuaBeiBox from './HuaBeiBox'
import CreditCardBox from './CreditCardBox'

class TradeIndex extends React.Component {
  static propTypes = {
    flow: PropTypes.instanceOf(Immutable.Map),
    error: PropTypes.object,
    trade: PropTypes.instanceOf(Immutable.Map),
    onTradeActions: PropTypes.object.isRequired,
  }

  static async getInitialProps({ store, query, isServer, res, req }) {
    if (query.flow_code) {
      // 风控实名成功回跳回来后处理实名逻辑
      if (query.zhima_unique_no && query.zhima_unique_no !== 'zhima_unique_no') {
        await store.dispatch(tradeActions.riskHandle({ zhima_unique_no: query.zhima_unique_no }, req))
      }
      const response = await store.dispatch(tradeActions.checkFlow({ query, req }))
      if (response.status) {
        return { error: response }
      }
      if (response.url) {
        if (isServer) {
          res.redirect(response.url)
          res.end()
        } else {
          window.location.href = response.url
        }
      }
      await store.dispatch(tradeActions.fetchInfo({ query, req }))
      return {}
    }
    return { error: { status: 404, errorMsg: '' } }
  }

  render() {
    const { error, flow, trade, onTradeActions } = this.props

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      icon: '',
      onLeftClick: noop,
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>轻松用</Header>,
    }

    const isHuabei = ['pis001', 'pis004', 'pis033'].includes(trade.getIn(['trade_info', 'pis_code']))

    const productBoxProps = {
      thumb: trade.getIn(['sku_info', 'sku_img']),
      alias: trade.getIn(['sku_info', 'sku_name']),
      rent: trade.getIn(['trade_info', 'choose_installments_num']),
    }

    const huaBeiBoxProps = {
      flow,
      trade,
      onTradeActions,
    }

    return (
      <Container {...containerProps}>
        <Marquee />
        <ProductBox {...productBoxProps} />
        {isHuabei && <HuaBeiBox {...huaBeiBoxProps} />}
        {!isHuabei && <CreditCardBox {...huaBeiBoxProps} />}
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  flow: state.getIn(['easeu', 'trade', 'flow']),
  trade: state.getIn(['easeu', 'trade', 'index']),
})

const mapDispatchToProps = dispatch => ({
  onTradeActions: bindActionCreators(tradeActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeIndex)
