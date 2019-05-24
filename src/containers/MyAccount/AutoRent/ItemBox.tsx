import { Flex, NoticeBar } from 'antd-mobile'
import { Icon } from 'components'
import React from 'react'
import styles from './ItemBox.less'

const Item = Flex.Item

interface ItemBoxProps {
  frozenPrice: number
  frozenType: string
  onAutoRentActions: Function
}

const ItemBox = ({ frozenPrice }: ItemBoxProps) => {
  return (
    <>
      <div className={styles.item_box}>
        <Flex className={styles.item}>
          <Item>
            <span className={styles.label}>
              押金<span className={styles.sub_label}>无需还款，无需现金抵押</span>
            </span>
          </Item>
          <span>￥{frozenPrice}</span>
        </Flex>
        <Flex className={styles.item}>
          <Item>
            <span className={styles.label}>冻结方式</span>
          </Item>
          <Icon className={styles.icon} type={require('svg/huabei.svg')} />花呗预授权
        </Flex>
      </div>
      <NoticeBar icon={<Icon type={require('svg/warning-circle.svg')} size="xs" />}>
        冻结续租押金，原信用卡押金将在租期到期7天内释放
      </NoticeBar>
    </>
  )
}

export default ItemBox
