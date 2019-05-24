import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as tradeActions from 'actions/trade/index'
import { Container, Header, TabBar } from 'components'
import TopStep from './TopStep'
import AddressList from './AddressList'
import ProductBox from './ProductBox'
import PayTypeBox from './PayTypeBox'
import AssureBox from './AssureBox'
import PaymentBox from './PaymentBox'
import Footer from './Footer'
import SubmitBottom from './SubmitBottom'

const TradeIndex = ({ trade }) => {
  const containerProps = {
    renderHeader: <Header rightContentType="tabBar">确认订单</Header>,
    renderTabBar: <TabBar hidden />,
  }

  const addressListProps = {
    item: trade.get('userAddress'),
  }

  const productBoxProps = {
    thumb: trade.getIn(['trade', 'sku_small_img']),
    alias: trade.getIn(['trade', 'alias']),
  }

  const submitBottomProps = {
    hasAddress: !!trade.get('userAddress').count(),
  }

  return (
    <Container {...containerProps}>
      <TopStep />
      <AddressList {...addressListProps} />
      <ProductBox {...productBoxProps} />
      <PayTypeBox />
      <AssureBox />
      <PaymentBox />
      <Footer>{isAgree => <SubmitBottom isAgree={isAgree} {...submitBottomProps} />}</Footer>
    </Container>
  )
}

TradeIndex.propTypes = {
  trade: PropTypes.instanceOf(Immutable.Map).isRequired,
  // onTradeActions: PropTypes.object.isRequired,
}

// TradeIndex.getInitialProps = async ({ store, req, query }) => {
//   const myQuery = (req && req.query) || query
//   const headers = req && req.headers
//   await store.dispatch(tradeActions.fetchInfo({ query: myQuery, headers }))
// }

const mapStateToProps = state => ({
  trade: state.getIn(['trade', 'index']),
})

const mapDispatchToProps = dispatch => ({
  onTradeActions: bindActionCreators(tradeActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TradeIndex)
