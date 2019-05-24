import React from 'react'
import Box from './Box'
import styles from './ProductBox.less'

const ProductBox = ({ thumb, alias }: { thumb: string; alias: string }) => {
  return (
    <Box title="请确认订单信息">
      <div className={styles.product_info}>
        <img className={styles.thumb} src={thumb} alt="" />
        <div className={styles.text}>{alias}</div>
      </div>
    </Box>
  )
}

export default ProductBox
