import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Content.less'

const contentData = [AssetImage.Help.Order1, AssetImage.Help.Order2, AssetImage.Help.Order3]

const isCmblife = [AssetImage.Help.Order4, AssetImage.Help.Order5, AssetImage.Help.Order6]

const Content = ({ utm }: any) => {
  const data = utm.get('isCmblife') ? isCmblife : contentData
  return (
    <div className={styles.images_box}>
      {data.map((item, index) => {
        return <img alt="" src={item} key={index} />
      })}
    </div>
  )
}

export default Content
