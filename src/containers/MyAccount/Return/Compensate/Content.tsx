import { Flex, Toast } from 'antd-mobile'
import { Button, Icon } from 'components'
import React from 'react'
import styles from './Content.less'

export interface ItemBoxProps {}

const ItemBox: React.FunctionComponent<ItemBoxProps> = () => {
  return (
    <div className={styles.item}>
      <p className={styles.title_box}>
        质检结果 <span>[4] 项不合格</span>
      </p>
      <ul className={styles.list}>
        <li>
          <span className={styles.sm}>屏幕碎裂有肉眼可见的缝隙缝</span>
        </li>
        <li>
          <span>边框缺角</span>
        </li>
        <li>
          <span>边框缺角</span>
        </li>
        <li>
          <span>边框缺角</span>
        </li>
        <li>
          <span>边框缺角</span>
        </li>
      </ul>
      <Flex className={styles.opt} justify="center">
        收起<Icon type="up" />
      </Flex>
    </div>
  )
}

export interface ContentProps {}

const Content: React.FunctionComponent<ContentProps> = () => {
  const handlePay = () => {
    Toast.info('付款成功，可继续还机')
  }

  return (
    <div className={styles.box}>
      <p className={styles.title}>机器部分损坏，可支付赔偿金后申请还机</p>
      <ItemBox />
      <p className={styles.title_box}>
        需支付赔偿金 <span>¥210.00</span>
      </p>
      <div className={styles.fixed}>
        <Button type="primary" fixed={true} onClick={handlePay}>
          下一步
        </Button>
      </div>
    </div>
  )
}

export default Content
