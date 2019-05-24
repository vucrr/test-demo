import { Flex } from 'antd-mobile'
import * as React from 'react'
import Row from './Row'
import styles from './index.less'

export interface OrderProps {
  detail: any
}
// 订单信息
const order: React.FunctionComponent<OrderProps> = ({ detail }) => {
  return (
    <div className={styles.detail}>
      <Flex align="center" className={styles.introduce}>
        <div className={styles.thumb}>
          <img src={detail.getIn(['sku_info', 'sku_img_url'])} className={styles.img} alt="SKU" />
        </div>
        <div className={styles.sku_name}>{detail.getIn(['sku_info', 'sku_name'])}</div>
      </Flex>
      {detail.get('contract_detail').map((item: any, index: number) => {
        return (
          <Row
            key={index}
            title={item.get('title')}
            content={item.get('content')}
            sheet={item.get('tag') > 0}
            detail={detail}
          />
        )
      })}
    </div>
  )
}

export default order
