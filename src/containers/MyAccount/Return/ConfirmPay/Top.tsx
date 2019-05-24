import { Flex, List } from 'antd-mobile'
// import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './Top.less'

const Top = () => {
  // const Extra = (
  //   <Flex justify="end">
  //     <Icon className={classnames(styles.icon, styles.union_icon)} type={require('svg/union-pay-origin.svg')} />信用卡
  //   </Flex>
  // )

  const Extra = (
    <Flex justify="end">
      <Icon className={styles.icon} type={require('svg/alipay.svg')} />支付宝
    </Flex>
  )

  return (
    <>
      <div className={styles.top_box}>
        <Flex className={styles.title} justify="center">
          <Icon className={styles.icon} type={require('svg/right-circle-o.svg')} /> 质检通过
        </Flex>
        <p className={styles.sub_title}>经质检确认，您的手机符合还机要求，支付还机金额 ¥258 后即可还机成功哦。</p>
      </div>
      <List className={styles.payment}>
        <List.Item extra={Extra}>支付方式</List.Item>
      </List>
    </>
  )
}

export default Top
