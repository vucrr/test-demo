import { Container, Header, TabBar } from 'components'
import { GridHeaderProps } from 'containers/Help/Index/GridHeader'
import React from 'react'
import { connect } from 'react-redux'
import GridHeader from './GridHeader'
import ListItem from './ListItem'
import styles from './index.less'

type HelpProps = GridHeaderProps

const Help = ({ hideRight, utm }: HelpProps) => {
  const headerProps = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>帮助中心</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container className={styles.contentBox} {...containerProps}>
      <GridHeader hideRight={hideRight} utm={utm} />
      <ListItem utm={utm} />
    </Container>
  )
}

const mapStateToProps = (state: any) => ({
  hideRight: state.getIn(['serverApp', 'tabBar', 'hideHome']),
  utm: state.getIn(['serverApp', 'utm']),
})

export default connect(mapStateToProps)(Help)
