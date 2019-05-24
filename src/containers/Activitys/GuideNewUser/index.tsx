import { Container, Header, Swiper, TabBar } from 'components'
import React from 'react'
import Agile from './Agile'
import Cheap from './Cheap'
import Disburden from './Disburden'
import Reliable from './Reliable'
import TotalReason from './TotalReason'
import styles from './index.less'

export interface GuideNewUserProps {}

export interface GuideNewUserState {
  index: number
}

class GuideNewUser extends React.Component<GuideNewUserProps, GuideNewUserState> {
  readonly state: Readonly<GuideNewUserState> = {
    index: 0,
  }

  handleChange = (index: number) => {
    this.setState({ index })
  }

  render() {
    const { index } = this.state
    const containerProps = {
      renderHeader: <Header hidden={true}>一分钟了解享换机</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        <Swiper dots={false} direction="vertical" className={styles.swiper} afterChange={this.handleChange}>
          <div className={styles.page}>
            <TotalReason active={index === 0} />
          </div>
          <div className={styles.page}>
            <Cheap active={index === 1} />
          </div>
          <div className={styles.page}>
            <Disburden active={index === 2} />
          </div>
          <div className={styles.page}>
            <Agile active={index === 3} />
          </div>
          <div className={styles.page}>
            <Reliable active={index === 4} />
          </div>
        </Swiper>
      </Container>
    )
  }
}

export default GuideNewUser
