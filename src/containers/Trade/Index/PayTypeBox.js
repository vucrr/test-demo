import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Flex, List } from 'antd-mobile'
import { Icon } from 'components'
import styles from './PayTypeBox.less'

class PayTypeBox extends Component {
  static propTypes = {}

  state = {}

  handleChange = () => {}

  render() {
    return (
      <List className={styles.pay_type_box}>
        <div className={styles.header}>
          <span className={styles.title}>支付方式</span>
        </div>
        <List.Item onClick={this.handleChange}>
          <Flex className={styles.item}>
            <div className={styles.left}>
              <Icon type="icon-logo_huabei" />
              <span>花呗预授权</span>
            </div>
            <Icon className={classnames(styles.icon, styles.active)} type="icon-finish" />
          </Flex>
        </List.Item>
        <List.Item onClick={this.handleChange}>
          <Flex className={styles.item}>
            <div className={styles.left}>
              <img className={styles.icon} src={require('images/trade/union.png')} />
              <span>信用卡预授权</span>
            </div>
            <span className={styles.icon_check_box} />
          </Flex>
        </List.Item>
        <List.Item onClick={this.handleChange}>
          <Flex className={styles.item}>
            <div className={styles.left}>
              <img className={styles.icon} src={require('images/trade/union.png')} />
              <span>建行分期</span>
            </div>
            <span className={styles.icon_check_box} />
          </Flex>
        </List.Item>
      </List>
    )
  }
}

export default PayTypeBox
