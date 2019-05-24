import { Flex, List } from 'antd-mobile'
import classnames from 'classnames'
import React from 'react'
import styles from './ProductBox.less'

const Item = Flex.Item

interface ProductBoxProps {
  thumb: string
  alias: string
  rent: string
  margin?: boolean
}

const ProductBox = ({ thumb, alias, rent, margin = false }: ProductBoxProps) => {
  const showPrice = `${rent}`.startsWith('￥')
  return (
    <List className={classnames(styles.product_box, margin && styles.margin)}>
      <Flex className={styles.product}>
        <img className={styles.thumb} src={thumb} />
        <Item>
          <span className={styles.text}>{alias}</span>
          {!showPrice && <span>租期：{rent}个月</span>}
          {showPrice && <span>租金：{rent}/月</span>}
        </Item>
      </Flex>
    </List>
  )
}

export default ProductBox
