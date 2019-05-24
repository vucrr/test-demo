import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import { delayHandle } from 'utils/tools'
import styles from './Tips.less'

export interface TipsProps {
  info: string
}

export interface TipsState {
  show: boolean
}

class Tips extends React.Component<TipsProps, TipsState> {
  readonly state: Readonly<TipsState> = {
    show: true,
  }

  hideTips = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ show: false })
    await delayHandle(0.3)
    document.querySelector('#centerTips')!.remove()
  }

  render() {
    return (
      <div
        id="centerTips"
        className={classnames(styles.tips_box, this.state.show && styles.active)}
        onClick={this.hideTips}
      >
        <Flex className={styles.tips}>
          {this.props.info} <Icon type="cross" />
        </Flex>
      </div>
    )
  }
}

export default Tips
