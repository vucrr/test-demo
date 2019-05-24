import React from 'react'
import PropTypes from 'prop-types'
import { List, Flex } from 'antd-mobile'
import styles from './ProductBox.less'

const Item = Flex.Item

const ProductBox = ({ thumb, alias }) => {
  return (
    <List renderHeader={() => '请确认订单明细'} className={styles.product_box}>
      <Flex className={styles.product}>
        <img className={styles.thumb} src={thumb} />
        <Item>
          <span className={styles.text}>{alias}</span>
        </Item>
      </Flex>
    </List>
  )
}

ProductBox.propTypes = {
  thumb: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
}

export default ProductBox
