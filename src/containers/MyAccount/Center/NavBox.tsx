import { Flex, List } from 'antd-mobile'
import { Link } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './NavBox.less'

const { Item } = List

export interface TopProps {
  balance: string
  coupon: string
}

const Top: React.FunctionComponent<TopProps> = ({ balance, coupon }) => {
  return (
    <Flex className={styles.top_box}>
      <Flex.Item>
        <Link to="/account/balance" native={true} trackEvent={TrackEventMyCenter.ViewBalance}>
          <p>{balance}</p>
          <span>余额(元)</span>
        </Link>
      </Flex.Item>
      <Flex.Item>
        <Link to="/account/couponlist" native={true} trackEvent={TrackEventMyCenter.ViewCards}>
          <p>{coupon}</p>
          <span>卡券(个)</span>
        </Link>
      </Flex.Item>
    </Flex>
  )
}

export interface NavProps {}

const Nav: React.FunctionComponent<NavProps> = () => {
  const handleClick = async (link: string, trackEvent?: TrackClickEventProperties) => {
    if (trackEvent) trackClickEvent(trackEvent)
    await Router.push(link)
  }
  return (
    <List className={styles.nav_box}>
      <Item
        className={styles.item}
        arrow="horizontal"
        onClick={() => handleClick('/account/footprint', TrackEventMyCenter.ViewCredit)}
      >
        <span>信用足迹</span>
      </Item>
      <Item className={styles.item} arrow="horizontal" onClick={() => handleClick('/myaccount/withholding/list')}>
        <span>租金代扣管理</span>
      </Item>
      <Item
        className={styles.item}
        arrow="horizontal"
        onClick={() => handleClick('/help', TrackEventMyCenter.HelpCenter)}
      >
        <span>帮助中心</span>
      </Item>
    </List>
  )
}

export interface NavBoxProps {
  balance: string
  coupon: string
}

const NavBox: React.FunctionComponent<NavBoxProps> = ({ balance, coupon }) => {
  return (
    <>
      <Top balance={balance} coupon={coupon} />
      <Nav />
    </>
  )
}

export default NavBox
