import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './Recommend.less'

export interface RecommendProps {}

const Recommend: React.FunctionComponent<RecommendProps> = () => {
  return (
    <div className={styles.recommend}>
      <p className={styles.title}>手机到期，哪种方案更划算？</p>
      <Flex justify="between" align="end" className={styles.threeways}>
        <img src={require('images/activity/guild-old-user/recommend_1.png')} alt="" />
        <img src={require('images/activity/guild-old-user/recommend_2.png')} alt="" />
        <img src={require('images/activity/guild-old-user/recommend_3.png')} alt="" />
      </Flex>
    </div>
  )
}

export default Recommend
