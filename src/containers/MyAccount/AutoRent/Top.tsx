import { Flex } from 'antd-mobile'
import { Icon, PrimaryLabel } from 'components'
import React from 'react'
import styles from './Top.less'

const Top = ({ rentPrice, installment, isOpen }: { rentPrice: number; installment: number; isOpen: 0 | 1 }) => {
  return (
    <>
      <div className={styles.top_box}>
        <Flex className={styles.title} justify="center">
          <Icon className={styles.icon} type={require('svg/auto-rent.svg')} />
          {isOpen === 1 && '已开启'}自动续租服务
        </Flex>
        <span>到期自动续，省心省力</span>
        <div className={styles.price}>
          <PrimaryLabel>¥{rentPrice}/月</PrimaryLabel>
        </div>
        <span>续租租金</span>
      </div>
      <div className={styles.text_box}>
        <ul>
          <li>
            <PrimaryLabel>•</PrimaryLabel>到期后自动按月续租，最长可续{installment}个月；
          </li>
          <li>
            <PrimaryLabel>•</PrimaryLabel>期间可随时还机或买断；
          </li>
          <li>
            <PrimaryLabel>•</PrimaryLabel>续租到期自动买断，不再收费。
          </li>
        </ul>
      </div>
    </>
  )
}

export default Top
