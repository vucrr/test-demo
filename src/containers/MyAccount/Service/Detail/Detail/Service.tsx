import { TrackEventMyCenter } from 'configs/trackEventLabels'
import * as React from 'react'
import Row from './Row'
import styles from './index.less'

export interface ServiceProps {
  detail: any
}
// 服务信息（发票和协议）
const Service = (props: ServiceProps) => {
  const { detail } = props
  return (
    <div className={styles.detail}>
      {detail.getIn(['contract_other_list']).map((item: any, index: number) => {
        const trackEvent = item.get('item_type') === 1 ? TrackEventMyCenter.Invoice : TrackEventMyCenter.Contract
        return (
          <Row
            key={index}
            title={item.get('item_name')}
            content={item.get('item_content')}
            link={item.get('item_link')}
            trackEvent={trackEvent}
          />
        )
      })}
    </div>
  )
}
export default Service
