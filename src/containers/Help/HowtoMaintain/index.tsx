import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import Content from './Content'

const HowtoMaintain = () => {
  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>维修流程</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Content />
    </Container>
  )
}

export default connect()(HowtoMaintain)
