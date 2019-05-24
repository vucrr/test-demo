import React from 'react'
import styles from './ProductDetail.less'

interface ProductDetailProps {
  price: any
}

const ProductDetail = (props: ProductDetailProps) => {
  const { price } = props
  return (
    <div className={styles.container}>
      <div className={styles.detail}>
        <img src={price.get('sku_img')} alt="image" />
        <div className={styles.texts}>
          <p>{price.get('sku_name')}</p>
          <p>使用时长：{price.get('total_installments_number')}个月</p>
          <p>到期时间：{price.get('dt_end_date')}</p>
          {price.get('return_price') ? <span>支付金额：￥{price.get('return_price')}</span> : null}
        </div>
      </div>
      <div className={styles.tip}>
        还机还剩 <span>{price.get('left_day')}</span> 天 <span>{price.get('left_hour')}</span> 小时
      </div>
    </div>
  )
}

export default ProductDetail
