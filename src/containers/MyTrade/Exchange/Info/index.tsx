import { Container, Header, TabBar } from 'components'
import * as React from 'react'
import Explain from './Explain'
import Privilege from './Privilege'
import Step from './Step'
import styles from './common.less'

export interface InfoProps {}

export interface InfoState {}

class Info extends React.Component<InfoProps, InfoState> {
  // state = { : }
  render() {
    const containerProps = {
      renderHeader: <Header> 换机须知 </Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <div className={styles.common}>
          <Step />
          <Privilege />
          <Explain />
        </div>
      </Container>
    )
  }
}

export default Info
