import { Flex } from 'antd-mobile'
import { LazyImage } from 'components'
import React from 'react'
import styles from './Top.less'

const Item = Flex.Item

export interface TopProps {
  account: string
  name: string
}

const Top: React.FunctionComponent<TopProps> = ({ account, name }) => {
  return (
    <Flex className={styles.top_box}>
      <Flex className={styles.list}>
        <LazyImage className={styles.avatar} src={require('images/enterprise/avatar.png')} alt="" />
        <Item>
          <p>{account}</p>
          <Flex>
            <img className={styles.icon} src={require('images/enterprise/company-gray.png')} />
            <span>{name}</span>
          </Flex>
        </Item>
      </Flex>
    </Flex>
  )
}

export default Top
