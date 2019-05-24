import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon, Link, withAuth, withSource } from 'components'
import { AuthProps } from 'components/withAuth'
import { SourceProps } from 'components/withSource'
import Cookies from 'js-cookie'
import React from 'react'
import { compose } from 'redux'
import styles from './AlipayBox.less'

const Item = Flex.Item

interface AlipayBoxProps {
  show: boolean
  tradeParams?: string
  togglePopup: Function
  curRent: any
  onChangePopupModalId: Function
}

const AlipayBox = ({
  auth,
  utm,
  show,
  tradeParams,
  curRent,
  onChangePopupModalId,
}: AlipayBoxProps & AuthProps & SourceProps) => {
  const code = Cookies.get('store_code') ? '&store_code=' + Cookies.get('store_code') : ''
  const linkTo = () => {
    const openAlipayUrl = `/product/open-alipay${tradeParams}${code}`
    // 湖南移动
    if (utm.get('isHnyd')) {
      return `/mytrade/hunanmobile/select-number?go=${encodeURIComponent(openAlipayUrl)}`
    } else if (auth.get('isLogin')) {
      return openAlipayUrl
    } else {
      return `/account/login?redirect=${encodeURIComponent(`/product/open-alipay${tradeParams}`)}${code}`
    }
  }

  const getTradeUrl = () => {
    if (utm.get('isOpenAlipay')) {
      return '/trade/index'
    }
    return '/mytrade/order/confirm'
  }

  const creditLink = utm.get('isHnyd')
    ? `/mytrade/hunanmobile/select-number?go=${encodeURIComponent(`/trade/index${tradeParams}`)}`
    : `${getTradeUrl()}${tradeParams}`

  return (
    <div className={classnames(styles.alipay_box, show && styles.active)}>
      <Flex className={styles.popup_header}>
        <Icon onClick={() => onChangePopupModalId({ id: 1 })} type={require('svg/arrow-left.svg')} />
        <Item className={styles.title}>
          <span>芝麻信用评估</span>
        </Item>
        {/* <Flex className={styles.btn_close} justify="center" align="center">
          <Icon onClick={e => togglePopup(e, false)} type={require('svg/close.svg')} />
        </Flex> */}
      </Flex>
      <Flex direction="column" align="stretch" className={styles.popup_alipay_body}>
        <Item>
          <div className={styles.title}>芝麻信用评估可减免押金</div>
          <div className={styles.sub_title}>
            最高可减<span>￥{curRent.get('reduce_cash')}</span>
          </div>
        </Item>
        <div className={styles.bottom_box}>
          <a className={classnames(styles.btn, styles.btn_primary)} href={linkTo()}>
            支付宝下单享减免
          </a>
          <Link className={classnames(styles.btn, styles.btn_outline)} native={true} to={creditLink}>
            信用卡快速下单
          </Link>
          <span className={styles.tips}>无需评估，不享受减免</span>
        </div>
      </Flex>
    </div>
  )
}

export default compose(
  withSource,
  withAuth,
)(AlipayBox) as React.ReactType
