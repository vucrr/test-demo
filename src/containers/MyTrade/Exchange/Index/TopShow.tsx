import { Flex } from 'antd-mobile'
import { TrackEventExchange } from 'configs/trackEventLabels'
// import { Link } from 'components'
import { AssetImage } from 'constant/uikit'
import Router from 'next/router'
import * as React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './TopShow.less'

export interface TopShowProps {}
const Item = Flex.Item
const TopShow: React.FunctionComponent<TopShowProps> = () => {
  const toLink = async () => {
    trackClickEvent({ category: TrackEventExchange.Remind.category, label: TrackEventExchange.Remind.name1 })
    await Router.push('/mytrade/exchange/info')
  }
  return (
    <div className={styles.topshow}>
      <img src={AssetImage.MyTrade.Exchange.Mag} alt="" className={styles.main_img} />
      <h2>
        您目前有服务中的订单，可选择无<br />缝换机，确定要换机吗?
      </h2>
      <Flex justify="center" align="center">
        <Item className={styles.introduce}>
          <img src={AssetImage.MyTrade.Exchange.Fangbian} alt="" />
          <p>
            先拿到新机<br />再还旧机
          </p>
        </Item>
        <Item className={styles.introduce}>
          <img src={AssetImage.MyTrade.Exchange.Chaozhi} alt="" />
          <p>
            新旧机重合期<br />只收一台机器费用
          </p>
        </Item>
        <Item className={styles.introduce}>
          <img src={AssetImage.MyTrade.Exchange.Shengqian} alt="" />
          <p>
            旧机押金<br />可用做新机押金
          </p>
        </Item>
      </Flex>
      <span className={styles.link_info} onClick={toLink}>
        换机须知 >
      </span>
    </div>
  )
}

export default TopShow
