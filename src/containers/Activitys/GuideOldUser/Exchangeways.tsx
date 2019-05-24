import { Flex } from 'antd-mobile'
import cx from 'classnames'
import { LazyImage, Link } from 'components'
import React from 'react'
import styles from './Exchangeways.less'
import TitleButton from './TitleButton'

export interface ExchangewaysProps {}

const Exchangeways: React.FunctionComponent<ExchangewaysProps> = () => {
  const ItemData = [
    {
      imgurl: require('images/activity/guild-old-user/item_1.png'),
      title: '旧机可延长7天租期',
      dec: '到期前换新手机',
    },
    {
      imgurl: require('images/activity/guild-old-user/item_2.png'),
      title: '极速优先发货',
      dec: '舍不得让您久等',
    },
    {
      imgurl: require('images/activity/guild-old-user/item_3.png'),
      title: '全程保修',
      dec: '碎屏意外等均有保障',
    },
    {
      imgurl: require('images/activity/guild-old-user/item_4.png'),
      title: '隐私擦除',
      dec: '手机归还后，由专业机构进行隐私擦除，让您后顾无忧',
    },
  ]
  return (
    <div className={styles.exchangeways}>
      <TitleButton title={'换新机方案'} />
      <img className={styles.seal} src={require('images/activity/guild-old-user/seal.png')} alt="" />
      <div className={styles.part1}>
        <Flex className={styles.part_title}>
          <img src={require('images/activity/guild-old-user/side.png')} alt="" />
          <span>租金差不多，换上最新机</span>
        </Flex>
        <p className={styles.title_text}>以iPhone X 64G 和 iPhone XS 64G为例</p>
        <p className={styles.title_dec}>*实际价格以线上为准</p>
        <div className={styles.paymore}>
          <img src={require('images/activity/guild-old-user/paymore.png')} alt="" />
        </div>
        <Flex justify="between" className={styles.phone_box}>
          <div className={styles.box_left}>
            <img src={require('images/activity/guild-old-user/phone_left.png')} alt="" />
            <p>在租手机</p>
            <p>iPhone X 64G</p>
            <p>¥398/月</p>
          </div>
          <div className={styles.box_center}>
            <img src={require('images/activity/guild-old-user/arrow.png')} alt="" />
          </div>
          <div className={styles.box_right}>
            <img src={require('images/activity/guild-old-user/phone_right.png')} alt="" />
            <p>要换手机</p>
            <p>iPhone XS 64G</p>
            <p>¥398/月</p>
          </div>
        </Flex>
      </div>
      <div className={styles.part2}>
        <Flex className={styles.part_title}>
          <img src={require('images/activity/guild-old-user/side.png')} alt="" />
          <span>换新机的4大权益保障</span>
        </Flex>
        <div className={styles.protection}>
          {ItemData.map((item: any, index: number) => {
            return (
              <Flex align="start" key={index} className={styles.protectionList}>
                <img src={item.imgurl} alt="" />
                <div className={styles.item}>
                  <p className={styles.item_title}>{item.title}</p>
                  <p className={styles.item_dec}>{item.dec}</p>
                </div>
              </Flex>
            )
          })}
        </div>
      </div>
      <div className={styles.part3}>
        <Flex className={styles.part_title}>
          <img src={require('images/activity/guild-old-user/side.png')} alt="" />
          <span>换新机后 旧机怎么办？</span>
        </Flex>
        <p className={cx(styles.title_text, styles.title_text_old)}>
          在还机标准范围内的机器均可以免费还机
          <Link to={'/myaccount/return/standard'}>
            <img className={styles.howLogo} src={require('images/activity/guild-old-user/how.png')} alt="" />
          </Link>
        </p>
        <LazyImage className={styles.step} src={require('images/activity/guild-old-user/step_1.png')} alt="" />
        <LazyImage className={styles.step} src={require('images/activity/guild-old-user/step_2.png')} alt="" />
        <LazyImage className={styles.step} src={require('images/activity/guild-old-user/step_3.png')} alt="" />
      </div>
    </div>
  )
}

export default Exchangeways
