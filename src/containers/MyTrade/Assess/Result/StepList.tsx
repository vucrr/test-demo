import { ActionSheet, Flex } from 'antd-mobile'
import { Icon } from 'components'
import { TrackEventTradeAssess } from 'configs/trackEventLabels'
import React from 'react'
import popupStyles from 'themes/action-sheet.less'
import { trackClickEvent } from 'utils/piwik'
import Step from './Step'
import styles from './Step.less'

export interface StepListProps {
  stepList: any
  chargeInfo?: any
}

export const showActionSheet = (chargeInfo: any) => {
  trackClickEvent({ label: TrackEventTradeAssess.result.name1, category: TrackEventTradeAssess.result.category })
  const BUTTONS: any = [
    <div className={popupStyles.popup_body_box} key="1">
      <div className={styles.sheetDteail}>
        {chargeInfo.get('price_info').map((item: any, index: number) => {
          return (
            <Flex justify="between" key={index}>
              {item.get('title')}
              <span>￥{item.get('content')}</span>
            </Flex>
          )
        })}
      </div>
      <Flex justify="end" className={styles.total}>
        {chargeInfo.get('total_text')} <span>¥{chargeInfo.get('total_price')} </span>
      </Flex>
    </div>,
  ]
  ActionSheet.showActionSheetWithOptions({
    options: BUTTONS,
    title: (
      <div className={popupStyles.popup_title}>
        <span>支付费用明细</span>
        <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} onClick={() => ActionSheet.close()} />
      </div>
    ),
    maskClosable: true,
    className: popupStyles.popup_box,
  })
}
const StepList: React.FunctionComponent<StepListProps> = ({ stepList, chargeInfo }) => {
  return (
    <Step
      showActionSheet={() => showActionSheet(chargeInfo)}
      stepList={stepList}
      total={chargeInfo.get('total_price')}
    />
  )
}

export default StepList
