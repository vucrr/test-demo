import { Grid } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './GridHeader.less'

const GridHeader = ({ backgroundColor = '#f8f8f8' }) => {
  const data = [
    { icon: require('svg/pick.svg'), text: '挑选机器' },
    { icon: require('svg/xinyong.svg'), text: '押金0支付' },
    { icon: require('svg/pay.svg'), text: '月付租金' },
    { icon: require('svg/guihuan.svg'), text: '归还/买断' },
  ]

  return (
    <Grid
      className={styles.thumb_box}
      itemStyle={{ backgroundColor }}
      data={data}
      hasLine={false}
      activeClassName={styles.grid_item_active}
      renderItem={(item, index) => (
        <div className={classnames(styles.item_content, index === data.length - 1 && styles.last)}>
          <Icon className={styles.grid_icon} type={item && item.icon} />
          <div className={styles.grid_text}>{item && item.text}</div>
        </div>
      )}
    />
  )
}

export default GridHeader
