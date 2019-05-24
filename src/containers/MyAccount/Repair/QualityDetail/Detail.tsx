import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './Detail.less'

const Detail = ({ detail }: any) => {
  return (
    <div className={styles.qua_detail}>
      <Flex>
        <h3 className={styles.detail_tit}>售后单号：</h3>
        <p>{detail.get('sn')}</p>
      </Flex>
      <Flex>
        <h3 className={styles.detail_tit}>申请时间：</h3>
        <p>{detail.get('dt_created')}</p>
      </Flex>
      <Flex align="start">
        <Flex justify="between" className={styles.detail_tit}>
          问<span>题：</span>
        </Flex>
        <p>{detail.get('desc')}</p>
      </Flex>
    </div>
  )
}

export default Detail
