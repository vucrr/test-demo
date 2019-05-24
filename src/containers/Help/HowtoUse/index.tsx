import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import GridHeader from './GridHeader'
import ListItem from './ListItem'

const HowToUse = ({ utm }: any) => {
  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>租机流程</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <GridHeader />
      <ListItem utm={utm} />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  utm: state.getIn(['serverApp', 'utm']),
})

export default connect(mapStateToProps)(HowToUse)
