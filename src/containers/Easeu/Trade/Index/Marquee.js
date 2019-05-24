import React from 'react'
import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import styles from './Marquee.less'

const Marquee = () => {
  return (
    <Flex className={styles.marquee_box}>
      <Icon className={styles.icon} type={require('svg/warning-circle.svg')} />下一步即进入支付环节，请确保是您本人在门店现场下单
    </Flex>
  )
}

export default Marquee
