import { ActionSheet, Flex } from 'antd-mobile'
import { Icon } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
// import Router from 'next/router'
import * as React from 'react'
import popupStyles from 'themes/action-sheet.less'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './index.less'

export interface RowProps {
  title: string // 标题
  content: string // 信息
  sheet?: any // 押金明细icon
  link?: string // 跳转
  detail?: any // 押金明细详情
  trackEvent?: TrackClickEventProperties
}

const Row: React.FunctionComponent<RowProps> = ({ title, content, sheet, link, detail, trackEvent }) => {
  const closeActionSheet = () => {
    trackClickEvent(TrackEventMyCenter.DepositDetails)
    ActionSheet.close()
  }
  const showActionSheet = () => {
    trackClickEvent(TrackEventMyCenter.Deposit)
    // 样式与其他组件有细节区别
    const BUTTONS: any = [
      <div className={popupStyles.popup_body_box} key="1">
        {detail.getIn(['deposit_info', 'detail_info']).map((item: any, index: number) => {
          return (
            <Flex justify="between" className={styles.gray_text} key={index}>
              {item.get('item_name')}
              <span>￥{item.get('item_amount')}</span>
            </Flex>
          )
        })}
        <Flex className={styles.sum} align="start">
          <Flex.Item>
            <h5>{detail.getIn(['deposit_info', 'total_frozen_title'])}</h5>
            <p className={styles.gray_text}>{detail.getIn(['deposit_info', 'remark'])}</p>
          </Flex.Item>
          <span>￥{detail.getIn(['deposit_info', 'total_frozen_amount'])}</span>
        </Flex>
      </div>,
    ]
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      title: (
        <div className={popupStyles.popup_title}>
          <span>{detail.getIn(['deposit_info', 'page_title'])}</span>
          <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} onClick={closeActionSheet} />
        </div>
      ),
      maskClosable: true,
      className: popupStyles.popup_box,
    })
  }

  const toLink = () => {
    if (!link) return
    if (trackEvent) {
      trackClickEvent(trackEvent)
    }
    location.href = link
  }

  return (
    <Flex align="start" justify="between" className={styles.introduce} onClick={toLink}>
      <Flex className={styles.title}>
        {title}
        {sheet && (
          <Icon
            color="#00A699"
            type={require('svg/question-circle.svg')}
            className={styles.icon}
            onClick={showActionSheet}
          />
        )}
      </Flex>
      {link ? (
        <Flex className={styles.link}>
          {content}
          <Icon color="#AAAAAA" type={require('svg/arrow-right.svg')} className={styles.to_icon} />
        </Flex>
      ) : (
        <span>{content}</span>
      )}
    </Flex>
  )
}
export default Row
