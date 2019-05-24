import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './Top.less'

const Item = Flex.Item

export interface TopProps {}

const Top: React.FunctionComponent<TopProps> = () => {
  return (
    <div className={styles.top_box}>
      <Flex className={styles.list}>
        <Item>
          <p>10000+</p>
          <span>线下合作网点</span>
        </Item>
        <Item>
          <p>1000万+</p>
          <span>个人用户</span>
        </Item>
        <Item>
          <p>800+</p>
          <span>可选机型</span>
        </Item>
        <Item>
          <p>15+</p>
          <span>企业权益</span>
        </Item>
      </Flex>
    </div>
  )
}

export default Top
