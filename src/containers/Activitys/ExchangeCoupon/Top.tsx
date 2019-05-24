import React from 'react'
import styles from './Top.less'

const Top = (props: { title: string }) => {
  return (
    <div className={styles.top}>
      <p className={styles.tit}>
        使用{props.title}的用户<br />都在换...
      </p>
      <img className={styles.zhezhao} src={require('images/activitys/ExchangeCoupon/zhezhao.png')} alt="" />
      <div className={styles.fybg} />
      <p className={styles.foryou}>为你推荐</p>
      <p className={styles.cheaper}>与您现有机型相比，换以下手机最划算</p>
    </div>
  )
}

export default Top
