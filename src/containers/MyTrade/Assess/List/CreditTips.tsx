import { LazyImage } from 'components'
import React from 'react'
import styles from './CreditTips.less'

export interface CreditTipsProps {
  creditTitle: any
  creditDesc: any
  creditIcon: any
}

const CreditTips: React.FunctionComponent<CreditTipsProps> = ({ creditTitle, creditDesc, creditIcon }) => {
  return (
    <div className={styles.CreditTips}>
      <div className={styles.creditInfo}>
        <LazyImage className={styles.creditIcon} src={creditIcon} alt="" />
        <span className={styles.creditTitle}>{creditTitle}</span>
      </div>
      <p className={styles.creditDesc}>{creditDesc}</p>
    </div>
  )
}

export default CreditTips
