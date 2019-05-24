import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import Content from './Content'

const HowtoOrder = ({ utm }: any) => {
  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>下单流程</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Content utm={utm} />
    </Container>
  )
}
const mapStateToProps = (state: any) => ({
  utm: state.getIn(['serverApp', 'utm']),
})

export default connect(mapStateToProps)(HowtoOrder)
