import * as React from 'react'
import styles from './Detail.less'

export interface DetailProps {
  detail: any
}

const Detail: React.FunctionComponent<DetailProps> = ({ detail }) => {
  return (
    <div className={styles.detail}>
      <h2>{detail.get('sku_name')}</h2>
      <p>备用机单号：{detail.get('sn')}</p>
      <p>创建时间：{detail.get('dt_created')}</p>
    </div>
  )
}

export default Detail
