import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Top.less'

interface TopProps {
  headImage: string
  auth: any
  descList: any
}

interface TopState {
  delta: number
}

class Top extends React.Component<TopProps, TopState> {
  readonly state = {
    delta: 0,
  }

  start = 0

  touchstart = (event: TouchEvent) => {
    const touch = event.touches[0]
    this.start = touch.pageY
  }

  touchmove = (event: TouchEvent) => {
    const touch = event.touches[0]
    this.setState({ delta: this.start - touch.pageY })
  }

  touchend = (event: TouchEvent) => {
    const touch = event.touches[0]
    this.setState({ delta: 0 })
    this.start = (touch && touch.pageY) || 0
  }

  touchcancel = () => {
    if (this.state.delta < 0) {
      window.setTimeout(() => {
        this.setState({ delta: 0 })
      }, 300)
    }
  }

  componentDidMount(): void {
    window.addEventListener('touchstart', this.touchstart)
    window.addEventListener('touchmove', this.touchmove)
    window.addEventListener('touchend', this.touchend)
    window.addEventListener('touchcancel', this.touchcancel)
  }

  componentWillUnmount(): void {
    window.removeEventListener('touchstart', this.touchstart)
    window.removeEventListener('touchmove', this.touchmove)
    window.removeEventListener('touchend', this.touchend)
    window.removeEventListener('touchcancel', this.touchcancel)
  }

  handleBack = () => {
    Router.back()
  }

  render() {
    const { headImage, auth, descList } = this.props
    return (
      <div className={styles.container}>
        <Flex align="center" justify="center" className={styles.callback} onClick={this.handleBack}>
          <Icon type={require('svg/arrow-left.svg')} size="md" className={styles.back} />
        </Flex>
        <img
          className={styles.topImage}
          src={headImage}
          style={{ transform: `scale(${this.state.delta < 0 ? 1.1 : 1})` }}
        />
        <div className={styles.titleWrapper}>
          <Flex className={styles.title} justify="center" align="center">
            <img className={styles.logo} src={auth.get('logo')} />
            <h1>{auth.get('desc')}</h1>
          </Flex>
          <Flex justify="between">
            {descList.map((item: any, key: number) => (
              <Flex align="center" className={styles.brand} key={key}>
                <img src={item.get('icon')} />
                <span>{item.get('desc')}</span>
              </Flex>
            ))}
          </Flex>
        </div>
      </div>
    )
  }
}

export default Top
