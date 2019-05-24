import React from 'react'
import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import styles from './AssureBox.less'

const Item = Flex.Item

const PaymentBox = () => {
  return (
    <div className={styles.list_box}>
      <div className={styles.header}>
        <span className={styles.title}>租金费用</span>
      </div>
      <div className={styles.body}>
        <div className={styles.list}>
          <Flex className={styles.item}>
            <Item>
              首期还款<span className={styles.sub_des}>（含意外保障金￥812.00）</span>
            </Item>
            <span>￥8300.00 x 1 期</span>
          </Flex>
          <Flex className={styles.item}>
            <Item>剩余分期</Item>
            <span>￥8300.00 x 1 期</span>
          </Flex>
        </div>
      </div>
      <Flex className={styles.footer}>
        <span className={styles.label}>还款方式</span>
        <Item className={styles.item}>
          <Flex>
            <Icon className={styles.icon} type="icon-logo_alipay" />
            <span>支付宝代扣</span>
          </Flex>
        </Item>
      </Flex>
    </div>
  )
}

export default PaymentBox
