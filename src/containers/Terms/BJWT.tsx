import { Container, Header, TabBar } from 'components'
import React from 'react'
import styles from './common.less'

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>融资租赁合同</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

const BJWT = () => (
  <Container {...containerProps}>
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: require('../../../static/md/bjwt-agreement.md') }}
    />
  </Container>
)

export default BJWT
