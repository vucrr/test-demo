import { Icon, Link } from 'components'
import React from 'react'
import styles from './None.less'

const None = () => {
  return (
    <div className={styles.noneBox}>
      <Icon type={require('svg/nodata.svg')} className={styles.icon} />
      <p className={styles.text}>手机号已选光，等会儿再来选新手机号吧~</p>
      <Link to="/" className={styles.btn}>
        返回首页
      </Link>
    </div>
  )
}

export default None
