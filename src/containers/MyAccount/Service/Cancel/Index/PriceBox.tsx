import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './PriceBox.less'

export interface PriceBoxProps {
  price: string
  text: string
}

const PriceBox: React.FunctionComponent<PriceBoxProps> = ({ price, text }) => {
  return (
    <div className={styles.container}>
      <Flex justify="between" className={styles.title}>
        <span>释放金额</span>
        <span>￥{price}</span>
      </Flex>
      <p>{text}</p>
    </div>
  )
}

export default PriceBox
