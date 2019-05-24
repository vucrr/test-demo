import { List } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Banner.less'

const Item = List.Item
interface BannerBoxProps {
  query: {
    source: string | undefined
    utm_source: string | undefined
    utm_medium: string | undefined
  }
}
interface BannerBoxState {
  data: {
    general: string
    weibo: string
    iphonex: string
    noviceGift: string
    weixin: string
    samsung: string
  }
}
class BannerList extends React.Component<BannerBoxProps, BannerBoxState> {
  state = {
    data: {
      general: AssetImage.Site.AppDownload.General,
      weibo: AssetImage.Site.AppDownload.Weibo,
      iphonex: AssetImage.Site.AppDownload.Iphonex,
      noviceGift: AssetImage.Site.AppDownload.NoviceGift,
      weixin: AssetImage.Site.AppDownload.Weixin,
      samsung: AssetImage.Site.AppDownload.Samsung,
      ahs_app: AssetImage.Site.AppDownload.AHSApp,
    },
  }
  render() {
    const { query } = this.props
    let srcUrl = ''
    if (query.utm_source !== undefined) {
      if (
        query.utm_source === 'weixin' ||
        query.utm_source === 'weibo' ||
        query.utm_source === 'iphonex' ||
        query.utm_source === 'ahs_app'
      ) {
        srcUrl = this.state.data[query.utm_source]
      } else if (
        query.utm_source === 'SMS-freshman' ||
        query.utm_source === 'baidu-search1-freshman' ||
        query.utm_source === 'baidu-search2-freshman'
      ) {
        srcUrl = this.state.data.noviceGift
      } else {
        srcUrl = this.state.data.general
      } // 'zhima' || 'default' || 'huabei' || 'jinritoutiao' || 'jinritoutiao2' || 'SMS' || 'baidu-search1' || 'baidu-search2' || 'baidu-search3'
    } else {
      srcUrl = this.state.data.general
    }
    if (query.utm_medium === 'weibo') {
      srcUrl = this.state.data[query.utm_medium]
    }
    return (
      <div className={styles.banner}>
        <img src={srcUrl} />
      </div>
    )
  }
}
const Advantage = () => {
  const data = [
    { icon: require('svg/coin-zero.svg'), title: '0元下单', desc: ['100%全新机，花呗全额抵押金'] },
    { icon: require('svg/tag-rmb.svg'), title: '按月付费', desc: ['先用后付，租金最低 139元／月'] },
    { icon: require('svg/exchange.svg'), title: '灵活用机', desc: ['租约到期，换新/续租/买断随心选'] },
    {
      icon: require('svg/arrow-bend.svg'),
      title: '还机无忧',
      desc: ['到期归还手机，不收取任何费用', '专业数据清除，保障您的隐私安全'],
    },
    { icon: require('svg/pliers.svg'), title: '全程包修', desc: ['使用过程中任何原因损坏，我们全包了'] },
  ]
  return (
    <div className={styles.advantage}>
      {data.map((item, index) => {
        return (
          <Item thumb={<Icon className={styles.icon} type={item.icon} />} className={styles.item} key={index}>
            <span className={styles.title}>{item.title}</span>
            <p className={classnames(styles.desc, item.desc.length !== 1 && styles.desc_br)}>
              {item.desc.map((item2, index2) => {
                if (index2 !== 0) {
                  return (
                    <span className={styles.caidan} key={index2}>
                      {item2}
                    </span>
                  )
                }
                return item2
              })}
            </p>
          </Item>
        )
      })}
      <p className={styles.tips}>*维修总费用不超过机器价值的90%</p>
    </div>
  )
}
const Banner = (res: any) => {
  return (
    <div>
      <BannerList query={res.query} />
      <Advantage />
    </div>
  )
}

export default Banner
