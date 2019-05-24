import { Flex } from 'antd-mobile'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './RepairCell.less'

const Item = Flex.Item

export const Footer = ({ loading }: { loading: boolean }) => (
  <Flex justify="center" className={styles.footer}>
    {loading ? '正在加载中' : '没有更多了'}
  </Flex>
)

export const Empty = () => (
  <Flex direction="column" className={styles.empty}>
    <Icon type={require('svg/nothing.svg')} className={styles.image} />
    <p>暂无售后服务列表</p>
  </Flex>
)

const goRepair = async () => {
  await Router.push({ pathname: '/myaccount/repair/category', query: { trade_no: '' } })
}

const RepairCell = () => (
  <div className={styles.container}>
    <Flex className={styles.inner} direction="column" align="start">
      <Item className={styles.topWrapper}>订单编号：20180816201235691991</Item>
      <Flex className={styles.detailWrapper}>
        <img src="" alt="" />
        <Flex direction="column" align="start">
          <span>苹果 iPhone X 银色 64G 国行 全新</span>
          <span>合约期： 12个月</span>
        </Flex>
      </Flex>
      <Flex className={styles.buttonWrapper} justify="end">
        <Button className={styles.button} onClick={goRepair}>
          维修申报
        </Button>
      </Flex>
    </Flex>
  </div>
)

export default RepairCell
