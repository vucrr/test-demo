import { Flex } from 'antd-mobile'
import React from 'react'
import Lottie from 'react-lottie'
import styles from './ProductBox.less'

export interface ProductBoxProps {
  type: 1 | 2
  oldSku: any
  sku: any
}

const lottieProps = {
  options: {
    loop: true,
    autoplay: true,
    animationData: require('json/exchange-right.json'),
  },
  width: 27,
  height: 27,
}

const ProductBox: React.FunctionComponent<ProductBoxProps> = ({ type, oldSku, sku }) => {
  if (type === 1) {
    return (
      <div className={styles.product}>
        <div className={styles.thumb}>
          <img src={sku.get('sku_img_url')} />
        </div>
        <span>{sku.get('sku_name')}</span>
      </div>
    )
  }

  return (
    <Flex justify="between" align="start" className={styles.container}>
      <Flex direction="column" className={styles.phone}>
        <img src={oldSku.get('sku_img_url')} />
        <p className={styles.light}>{oldSku.get('sku_name')}</p>
      </Flex>
      <div className={styles.center}>
        <Lottie {...lottieProps} />
      </div>
      <Flex direction="column" className={styles.phone}>
        <img src={sku.get('sku_img_url')} />
        <p>{sku.get('sku_name')}</p>
      </Flex>
    </Flex>
  )
}

export default ProductBox
