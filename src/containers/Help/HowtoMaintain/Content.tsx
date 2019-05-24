import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Content.less'

const Content = () => {
  return (
    <div className={styles.images_box}>
      <img alt="" src={AssetImage.Help.Maintain1} />
      <img alt="" src={AssetImage.Help.Maintain2} />
    </div>
  )
}

export default Content
