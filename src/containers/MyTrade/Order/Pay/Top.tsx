import React from 'react'
import styles from './Top.less'

export interface TopProps {
  info: any
}

const Top: React.FunctionComponent<TopProps> = ({ info }) => {
  return (
    <div className={styles.top_box}>
      <h5>{info.get('title')}</h5>
      <p className={styles.price}>
        ￥ <span>{info.get('deposit_price')}</span>
      </p>
      {/* <p className={styles.text_sm} dangerouslySetInnerHTML={{ __html: info.get('head_desc') }} />
      <span className={styles.btn_blue}>{info.get('head_tips')}</span> */}
    </div>
  )
}

export default Top
