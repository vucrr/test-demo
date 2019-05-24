import { Icon, Link } from 'components'
import { TrackEventEnterPrise } from 'configs/trackEventLabels'
import React from 'react'
import styles from './None.less'

const None = () => {
  const trackEvent = {
    label: `${TrackEventEnterPrise.Btns.ContactCustomerService}`,
    category: TrackEventEnterPrise.Category,
  }
  const trackEventBack = {
    label: `${TrackEventEnterPrise.Btns.ReturnHomelnAccessariesSelected}`,
    category: TrackEventEnterPrise.Category,
  }
  return (
    <div className={styles.noneBox}>
      <Icon type={require('svg/empty.svg')} className={styles.icon} />
      <p className={styles.tit}>手机号已选光</p>
      <p className={styles.text}>暂时无法下单，等会儿再来看看吧～</p>
      <div className={styles.btns}>
        <Link to="tel:400-670-0188" className={styles.customerbtn} trackEvent={trackEvent}>
          联系客服
        </Link>
        <Link to="/" className={styles.btn} trackEvent={trackEventBack}>
          返回首页
        </Link>
      </div>
    </div>
  )
}

export default None
