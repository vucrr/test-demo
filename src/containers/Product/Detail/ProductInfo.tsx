import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './ProductInfo.less'

export interface ProductInfoProps {
  info: any
}

const ProductInfo: React.FunctionComponent<ProductInfoProps> = ({ info }) => {
  const hasLinePrice = !!info.get('line_price_desc')

  return (
    <div className={styles.pro_info} id="tabContent0">
      <Flex className={styles.price_info} justify="between">
        <p className={styles.left}>
          <span className={styles.cn}>¥</span>
          <span>{parseFloat(info.get('price'))}</span>
          <span className={styles.union}>/月起</span>
          {hasLinePrice ? <span className={styles.icon}>限时</span> : null}
        </p>
        <p className={styles.right}>
          市场价: ¥{parseFloat(info.get('market_price'))} <span>{info.get('owner_count')}人已拥有</span>
        </p>
      </Flex>
      {hasLinePrice ? <p className={styles.line_price}>{info.get('line_price_desc')}</p> : null}
      <h4>{info.get('title')}</h4>
      <p className={styles.sub_title}>{info.get('sub_title')}</p>
    </div>
  )
}

export default ProductInfo
