import { LazyImage } from 'components'
import React from 'react'
import styles from './HeaderImg.less'

export interface HeaderImgProps {
  showArrow?: boolean
}

const HeaderImg: React.FunctionComponent<HeaderImgProps> = ({ showArrow = true }) => {
  return (
    <div className={styles.common_img}>
      <LazyImage className={styles.headerimg} src={require('images/activity/guide-new-user/logo_title.png')} alt="" />
      {showArrow && <img className={styles.up_btn} src={require('images/activity/guide-new-user/up.png')} alt="" />}
    </div>
  )
}

export default HeaderImg
