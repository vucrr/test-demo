import { LazyImage } from 'components'
import React from 'react'
import styles from './Renewal.less'
import TitleButton from './TitleButton'

export interface RenewalProps {}

const Renewal: React.FunctionComponent<RenewalProps> = () => {
  return (
    <div className={styles.renewal}>
      <TitleButton title={'续租方案'} />
      <p className={styles.title}>继续租用，可以随时换新。</p>
      <LazyImage src={require('images/activity/guild-old-user/renewal.png')} alt="" />
    </div>
  )
}

export default Renewal
