import classnames from 'classnames'
import Router from 'next/router'
import React from 'react'
import styles from './HeaderTab.less'

async function linkToRepair() {
  await Router.push('/repair/list')
}

async function linkToRefund() {
  await Router.push('/refund/list')
}

const HeaderTab = ({ active }: { active: string }) => {
  const left = classnames(styles.tab, active === 'left' && styles.active)
  const right = classnames(styles.tab, active === 'right' && styles.active)

  return (
    <div className={styles.headerTab}>
      <div className={left} onClick={linkToRepair}>
        维修
      </div>
      <div className={right} onClick={linkToRefund}>
        退货
      </div>
    </div>
  )
}

export default HeaderTab
