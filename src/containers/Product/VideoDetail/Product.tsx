import React from 'react'
import styles from './Product.less'

const Product = ({ product }: { product: any }) => {
  return (
    <div className={styles.product_box}>
      <a className={styles.wrap} href={`/product/index?id_activity=${product.get('id')}`}>
        <img src={product.get('imgUrl')} alt="" className={styles.img} />
        <div className={styles.content}>
          <p className={styles.name}>{product.get('title')}</p>
          <p className={styles.price_wrap}>
            ¥{product.get('price')}
            <span className={styles.unit}>/月起</span>
            {product.get('baseFee') > 0 && (
              <span className={styles.origin_price_wrap}>{product.get('baseFee')}/月起</span>
            )}
          </p>
          <span className={styles.btn}>立即拥有</span>
        </div>
      </a>
    </div>
  )
}

export default Product
