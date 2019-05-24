import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './TopStep.less'

const Item = Flex.Item

const TopStep = () => {
  return (
    <Flex className={styles.step_box} justify="between">
      <Item className={styles.item}>1. 签订支付宝代扣</Item>
      <Item className={styles.item}>2. 授权担保额度</Item>
      <Item className={styles.item}>3. 订单完成</Item>
    </Flex>
  )
}

export default TopStep
