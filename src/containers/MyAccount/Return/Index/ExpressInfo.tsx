import { List } from 'antd-mobile'
import openExpressAddressModal from 'components/ExpressAddressModal'
import React from 'react'
import styles from './ExpressInfo.less'

const Item = List.Item

interface ExpressInfoProps {
  code: string
}

function ExpressInfo(props: ExpressInfoProps) {
  return (
    <div className={styles.container}>
      <List>
        <Item onClick={openExpressAddressModal} arrow="horizontal">
          邮寄地址
        </Item>
        <Item extra={props.code}>物流单号</Item>
      </List>
    </div>
  )
}

export default ExpressInfo
