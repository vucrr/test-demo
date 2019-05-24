// import { Toast } from 'antd-mobile'
import { Copy } from 'components'
import React from 'react'
import styles from './Order.less'

const Order = (props: { data: any }) => {
  const { data } = props
  const productInfo = data.get('sku_info')
  return (
    <div className={styles.orderBox}>
      <div className={styles.body}>
        <img src={productInfo.get('sku_img')} className={styles.img} />
        <p className={styles.name}>{productInfo.get('sku_name')}</p>
      </div>
      <div className={styles.footer}>
        顺丰速运
        <div>
          {data.get('express_number')}
          <Copy text={data.get('express_number')}>
            <span className={styles.btn}>复制</span>
          </Copy>
        </div>
      </div>
    </div>
  )
}

export default Order
