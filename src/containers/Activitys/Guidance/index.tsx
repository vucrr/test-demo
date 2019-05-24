import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import Footer from './Footer'
import Present from './Present'
import TopHeader from './TopHeader'
import styles from './index.less'

const newGuidance = ({ serverApp }: any) => {
  const headerProps = {
    rightContentType: 'tabBar',
  }
  const containerProps = {
    renderHeader: <Header {...headerProps}>0押租机，年年换新</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }
  return (
    <Container {...containerProps}>
      <div id={styles.newGuidance}>
        <TopHeader />
        <Present utm={serverApp.get('utm')} />
        <Footer utm={serverApp.get('utm')} ua={serverApp.get('ua')} />
      </div>
    </Container>
  )
}
const mapStateToProps = (state: any) => ({
  serverApp: state.getIn(['serverApp']),
})
export default connect(mapStateToProps)(newGuidance)
