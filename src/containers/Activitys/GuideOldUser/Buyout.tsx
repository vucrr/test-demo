import { LazyImage } from 'components'
import React from 'react'
import styles from './Renewal.less'
import TitleButton from './TitleButton'

export interface BuyoutProps {}

const Buyout: React.FunctionComponent<BuyoutProps> = () => {
  return (
    <div className={styles.renewal}>
      <TitleButton title={'买断方案'} />
      <p className={styles.title}>直接支付尾款，买下在租手机。</p>
      <LazyImage src={require('images/activity/guild-old-user/buyout.png')} alt="" />
    </div>
  )
}

export default Buyout
