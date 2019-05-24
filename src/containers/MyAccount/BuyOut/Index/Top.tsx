import { Flex, List } from 'antd-mobile'
import classnames from 'classnames'
import { Icon, ProductBox } from 'components'
import React from 'react'
import styles from './Top.less'

interface TopProps {
  isHuabei: boolean
  thumb: string
  alias: string
  rent: string
}

const Top = ({ isHuabei, ...productProps }: TopProps) => {
  const ExtraHuaBei = (
    <Flex justify="end">
      <Icon className={styles.icon} type={require('svg/alipay.svg')} />支付宝
    </Flex>
  )

  const ExtraCard = (
    <Flex justify="end">
      <Icon className={classnames(styles.icon, styles.union_icon)} type={require('svg/union-pay-origin.svg')} />信用卡
    </Flex>
  )

  return (
    <>
      <ProductBox {...productProps} />
      <List className={styles.payment}>
        <List.Item extra={isHuabei ? ExtraHuaBei : ExtraCard}>支付方式</List.Item>
      </List>
    </>
  )
}

export default Top
