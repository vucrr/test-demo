import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import ListItem from './ListItem'

const ComplaintAdvice = () => {
  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: (
      <Header hidden={false} {...headerProps}>
        客服咨询
      </Header>
    ),
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <ListItem />
    </Container>
  )
}

export default connect()(ComplaintAdvice)
