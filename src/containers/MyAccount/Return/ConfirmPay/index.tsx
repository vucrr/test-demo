import { NextSFC2 } from '@@types/next'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import BottomBox from './BottomBox'
import ItemBox from './ItemBox'
import Top from './Top'

interface ConfirmPayProps {
  cacheList: any
  onCacheListActions: any
}

const ConfirmPay: NextSFC2<ConfirmPayProps> = () => {
  const containerProps = {
    renderHeader: <Header>买断确认</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Top />
      <ItemBox />
      <BottomBox />
    </Container>
  )
}

// ConfirmPay.getInitialProps = async ({ store }) => {
//   await store.dispatch()
// }

// const mapStateToProps = (state: any) => ({
//
// })
//
// const mapDispatchToProps = (dispatch: any) => ({
//
// })

export default connect()(ConfirmPay)
