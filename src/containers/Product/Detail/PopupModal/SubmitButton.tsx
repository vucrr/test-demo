import classnames from 'classnames'
import { Button, ErrorMsg, Icon } from 'components'
import Router from 'components/Router'
import withAuth, { AuthProps } from 'components/withAuth'
import withSource, { SourceProps } from 'components/withSource'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import { renderUtmParams } from 'utils/tools'
import styles from './index.less'

// 弹窗通用按钮组件
interface SubmitButtonProps extends Partial<AuthProps>, Partial<SourceProps> {
  buttonText: string
  headers2: any
  property: any
  onDetailActions: any
  onUnlockPhone: Function
}

const SubmitButton: React.FunctionComponent<SubmitButtonProps> = props => {
  const { onUnlockPhone, onDetailActions, buttonText } = props
  const { property, headers2, utm, ua, auth } = props

  const popupModalId = property.get('popupModalId')
  const info = property.get('info')
  const vasList = property.get('vasList')
  const hasStock = property.get('hasStock')

  const noStockTipsSession: any = Cookies.get('noStockTipsSession') !== 'false'

  const [submitting, setSubmitting] = useState(false)
  const [showNoStockTips, setShowNoStockTips] = useState(noStockTipsSession)

  // 解绑已选号码
  const unBindPhoneNumber = async () => {
    const selectPhone: any = Cookies.getJSON('phone_number')
    if (selectPhone) {
      const phoneNumber = selectPhone.phone_number
      if (phoneNumber) {
        const data = await onUnlockPhone({ query: { phone_number: phoneNumber } })
        if (data) {
          Cookies.remove('phone_number')
        }
      }
    }
  }

  useEffect(() => {
    unBindPhoneNumber().catch()
  }, [])

  const computeVasIdsParams = () => {
    const vasIds = vasList.reduce((ids: string, item: any) => {
      const isSelected = item.get('is_required') || item.get('selected')
      if (ids === '') {
        return isSelected ? `${item.get('id')}` : ids
      }
      return isSelected ? `${ids},${item.get('id')}` : ids
    }, '')
    return vasIds.length ? `&vas_id=${vasIds}` : ''
  }

  const handleSubmit = () => async () => {
    const propertyList = property.get('propertyList')
    const curRent = property.get('curRent')
    const unSelectedItem = propertyList.find((item: any) =>
      item.get('value_list').every((value: any) => !value.get('selected')),
    )

    const selectedListKey = property.get('selectedListKey')

    if (unSelectedItem) {
      ErrorMsg.show(`请选择${unSelectedItem.get('name')}`)
      return false
    }

    if (!curRent) {
      ErrorMsg.show('对不起，没有匹配选中的合约！')
      return false
    }

    trackClickEvent({
      category: 'ProductDetail',
      label: 'SkuSelectorEnd',
      value: 1,
    })

    if (!hasStock) {
      await onDetailActions.noticeForNoStock(curRent.get('sku_id'), selectedListKey)
      return false
    }

    // 第一步结束 切换下个弹窗
    if (popupModalId === 0 && vasList.size) {
      onDetailActions.changePopupModalId({ id: 1 })
      return
    }

    setSubmitting(true)

    const params = `?mp_service_id=${curRent.get('id')}${computeVasIdsParams()}`
    const tradeUrl = `/trade/index${params}`
    const newTradeParams = `?contract_product_id=${curRent.get('id')}${computeVasIdsParams()}`
    const newTradeUrl = `/mytrade/order/confirm${newTradeParams}`
    let vasPhoneNumber = false
    // B2B2C 选号
    vasList.map(async (item: any) => {
      if ((item.get('selected') || item.get('is_required')) && item.get('flow_code') === 'phone_number') {
        vasPhoneNumber = item.get('id')
        return
      }
    })
    if (vasPhoneNumber) {
      const phoneUrl = `/enterprise/mytrade/pick-number?go=${encodeURIComponent(newTradeUrl)}&vas_id=${vasPhoneNumber}`
      await Router.push(phoneUrl)
    } else if (utm.get('isSamsungzs') && !auth.get('isLogin')) {
      // 判断是不是三星zs助手渠道
      onDetailActions.userOauthRedirect(tradeUrl)
    } else if (utm.get('isOpenAlipayNew') && !ua.get('isAlipay')) {
      const openUrl = `/product/open-alipay${newTradeParams}${renderUtmParams(headers2.toJS())}`
      if (auth.get('isLogin')) {
        await Router.push(openUrl)
      } else {
        await Router.push(`/account/login?redirect=${encodeURIComponent(openUrl)}`)
      }
    } else if (utm.get('isNewTrade') && ua.get('isAlipay')) {
      await Router.push(newTradeUrl)
    } else {
      setTimeout(() => {
        location.href = tradeUrl
      }, 1000)
    }
  }

  const handleHideNoStockTips = () => {
    setShowNoStockTips(false)
    Cookies.set('noStockTipsSession', 'false')
  }

  return (
    <div className={styles.bottom_btn_box}>
      {!hasStock && (
        <>
          {showNoStockTips && !hasStock ? (
            <div className={styles.tips}>
              {info.get('arrival_notice_tips')}
              <Icon className={styles.close} type={require('svg/close.svg')} onClick={handleHideNoStockTips} />
            </div>
          ) : null}
          <Button safeArea={true} className={classnames(styles.noStock, styles.btn_submit)} onClick={handleSubmit()}>
            {info.get('arrival_notice_title')}
          </Button>
        </>
      )}
      {hasStock && (
        <Button disabled={submitting} safeArea={true} className={styles.btn_submit} onClick={handleSubmit()}>
          {buttonText}
        </Button>
      )}
    </div>
  )
}

export default compose(
  withSource,
  withAuth,
)(SubmitButton) as React.ComponentClass<SubmitButtonProps>
