import React from 'react'
import PropTypes from 'prop-types'
import { Flex, List } from 'antd-mobile'
import styles from './ProductBox.less'

const Item = Flex.Item

const ProductBox = ({ thumb, alias, rent }) => {
  return (
    <List className={styles.product_box}>
      <Flex className={styles.product}>
        <img className={styles.thumb} src={thumb} />
        <Item>
          <span className={styles.text}>{alias}</span>
          <span>租期：{rent}个月</span>
        </Item>
      </Flex>
    </List>
  )
}
ProductBox.propTypes = {
  thumb: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  rent: PropTypes.string.isRequired,
}

export default ProductBox
