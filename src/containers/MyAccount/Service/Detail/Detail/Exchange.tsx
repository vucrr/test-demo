import { Flex } from 'antd-mobile'
import { Copy } from 'components'
import * as React from 'react'
import Row from './Row'
import styles from './index.less'

export interface ExchangeProps {
  detail: any
}
// 换机信息
const Exchange = (props: ExchangeProps) => {
  const { detail } = props
  if (!detail.getIn(['return_machine_list', 'return_type_name'])) return null
  if (detail.getIn(['return_machine_list', 'return_type']) === 1) {
    return (
      <div>
        <Flex className={styles.exchange_tit}>{detail.getIn(['return_machine_list', 'return_title'])}</Flex>
        <div className={styles.detail}>
          <Row title="还机方式" content={detail.getIn(['return_machine_list', 'return_type_name'])} />
          <Row
            title="还机门店"
            content={
              detail.getIn(['return_machine_list', 'return_store_name']) +
              detail.getIn(['return_machine_list', 'return_address'])
            }
          />
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Flex className={styles.exchange_tit}>{detail.getIn(['return_machine_list', 'return_title'])}</Flex>
        <div className={styles.detail}>
          <Row title="还机方式" content={detail.getIn(['return_machine_list', 'return_type_name'])} />
          <Row title="收件人" content={detail.getIn(['return_machine_list', 'return_user_name'])} />
          <Row title="联系方式" content={detail.getIn(['return_machine_list', 'return_user_phone'])} />
          <Row title="邮寄地址" content="上海市宝山区纪蕰路588号智力产业园2号楼1楼 享换机" />
          <div className={styles.copyWrapper}>
            <Copy text="上海市宝山区纪蕰路588号智力产业园2号楼1楼 享换机">
              <div className={styles.copyBtn}>复制</div>
            </Copy>
          </div>
        </div>
      </div>
    )
  }
}
export default Exchange
