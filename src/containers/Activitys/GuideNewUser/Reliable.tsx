import { Flex } from 'antd-mobile'
import { LazyImage, Link } from 'components'
import React from 'react'
import { Animated } from 'react-animated-css'
import HeaderImg from './HeaderImg'
import styles from './Reliable.less'

export interface ReliableProps {
  active: boolean
}

const Reliable: React.FunctionComponent<ReliableProps> = ({ active }) => {
  const TestData = [
    {
      imgUrl: require('images/activity/guide-new-user/page5_logo_1.png'),
      textTop: '芝麻信用丨花呗丨爱回收丨三星',
      textBottom: '战略合作伙伴',
    },
    {
      imgUrl: require('images/activity/guide-new-user/page5_logo_2.png'),
      textTop: '手机品牌授权',
      textBottom: '苹果、华为、小米等各大手机厂商官方合作',
    },
    {
      imgUrl: require('images/activity/guide-new-user/page5_logo_3.png'),
      textTop: '10,000,000+用户',
      textBottom: '大家都信赖的换机平台',
    },
  ]
  return (
    <div className={styles.reliable}>
      <HeaderImg showArrow={false} />
      <Animated className={styles.animated_style} animationIn="fadeIn" animationOut="fadeOut" isVisible={active}>
        <div className={styles.title}>靠谱</div>
        <p className={styles.title_dec}>好品牌 值得信赖</p>
      </Animated>
      <div className={styles.item_list}>
        {TestData.map((item: any, k: number) => {
          return (
            <Flex key={k} className={styles.item_member}>
              <LazyImage src={item.imgUrl} alt="" />
              <div className={styles.member_text}>
                <p className={styles.text_top}>{item.textTop}</p>
                <p className={styles.text_bottom}>{item.textBottom}</p>
              </div>
            </Flex>
          )
        })}
      </div>
      <Link native={true} to={'/product/category'} className={styles.lease_btn}>
        <span className={styles.lease_text}>我要租机</span>
      </Link>
      <LazyImage
        className={styles.arroundEarth}
        src={require('images/activity/guide-new-user/arroundEarth.png')}
        alt=""
      />
      <LazyImage
        className={styles.arroundAstronaut}
        src={require('images/activity/guide-new-user/arroundAstronaut.png')}
        alt=""
      />
    </div>
  )
}

export default Reliable
