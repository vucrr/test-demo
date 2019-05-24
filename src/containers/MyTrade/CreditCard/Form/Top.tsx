import React from 'react'
import styles from './Top.less'
export interface TopProps {}

const Top: React.FunctionComponent<TopProps> = () => {
  return (
    <div className={styles.credit_top}>
      <h2>请填写信用卡信息，确保卡内余额充足哦</h2>
    </div>
  )
}

export default Top
