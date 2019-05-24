import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './TopHeader.less'

const TopOne = () => {
  return (
    <div id={styles.topone}>
      <img src={AssetImage.Activity.Guidance.Image1} className={styles.topanim} />
      <img src={AssetImage.Activity.Guidance.Image2} className={styles.img} />
    </div>
  )
}
const Security = () => {
  return (
    <div className={styles.security}>
      <p>
        我们承诺： <img src={AssetImage.Activity.Guidance.Image3} />
      </p>
      <div>
        所有新机均为国行正品! <img src={AssetImage.Activity.Guidance.Image4} />
      </div>
    </div>
  )
}
const TopHeader = () => {
  return (
    <>
      <TopOne />
      <Security />
    </>
  )
}
export default TopHeader
