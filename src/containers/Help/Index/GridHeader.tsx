import { Grid } from 'antd-mobile'
import { LazyImage, Link } from 'components'
import React from 'react'
import styles from './GridHeader.less'

export interface GridHeaderProps {
  hideRight: boolean
  utm: any
}

const GridHeader = ({ hideRight }: GridHeaderProps) => {
  const data = [
    { icon: require('images/help/ComplaintAdvice/rentProcess.png'), text: '租机流程' },
    { icon: require('images/help/ComplaintAdvice/orderProcess.png'), text: '下单流程' },
    { icon: require('images/help/ComplaintAdvice/serviceProcess.png'), text: '维修流程' },
  ]

  if (!hideRight) {
    data.push({ icon: require('images/help/ComplaintAdvice/advisory.png'), text: '客服咨询' })
  }

  const links = ['/help/howtouse', '/help/howtoorder', '/help/howtomaintain', '/help/complaintadvice']

  return (
    <Grid
      className={styles.thumb_box}
      data={data}
      columnNum={data.length}
      hasLine={false}
      renderItem={(item, index) => (
        <Link className={styles.item_content} to={links[index]}>
          <LazyImage className={styles.grid_icon} src={item && item.icon} />
          <div className={styles.grid_text}>{item && item.text}</div>
        </Link>
      )}
    />
  )
}

export default GridHeader
