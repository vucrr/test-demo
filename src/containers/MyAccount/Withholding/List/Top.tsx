import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './Top.less'

export interface TopProps {
  item: any
}

const Top: React.FunctionComponent<TopProps> = ({ item }) => {
  return (
    <div className={styles.top_box}>
      <h4>您目前使用的租金代扣方式</h4>
      <Flex className={styles.item}>
        <img src={item.get('icon')} /> {item.get('title')}
      </Flex>
    </div>
  )
}

export default Top
