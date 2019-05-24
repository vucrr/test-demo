import { ActionSheet, Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import { TrackEventRentWithholding } from 'configs/trackEventLabels'
import React from 'react'
import popupStyles from 'themes/action-sheet.less'
import { trackClickEvent } from 'utils/piwik'
import styles from './Step.less'

export interface StepProps {
  showActionSheet?: any
  stepList: any
  total?: string
}

const Step: React.FunctionComponent<StepProps> = ({ showActionSheet, stepList, total = '' }) => {
  let sheetText = {
    title: '',
    context: '',
    list: [],
  }
  stepList.filter((item: any) => {
    if (item.get('step_code') === 'bindWithhold') {
      sheetText = item.get('info').toJS()
    }
  })
  const showActionSheetType = () => {
    trackClickEvent({
      label: TrackEventRentWithholding.AuthorizationConfirm.label,
      category: TrackEventRentWithholding.AuthorizationConfirm.category,
    })
    const BUTTONS: any = [
      <>
        <p className={styles.prompt}>
          您已开通以下还款方式，将会按照下面排列顺序扣款，若要更改还款方式，可以到“我的”→“还款方式管理”内操作。
        </p>
        <div className={classnames(popupStyles.popup_body_box, styles.body_box)}>
          {sheetText.list.map((item: any, index: number) => {
            return (
              <Flex className={styles.type} key={index}>
                <img src={item.icon} />
                {item.name}
              </Flex>
            )
          })}
        </div>
      </>,
    ]
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      title: (
        <div className={popupStyles.popup_title}>
          <span>还款方式</span>
          <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} onClick={() => ActionSheet.close()} />
        </div>
      ),
      maskClosable: true,
      className: popupStyles.popup_box,
    })
  }
  return (
    <div className={styles.stepBox}>
      {stepList.map((item: any, index: number) => {
        const content = item.get('step_code') === 'payFirstCharge'
        return (
          <Flex justify="between" align="start" className={styles.step} key={index}>
            <Flex.Item>
              <h4>{item.get('step_title')}</h4>
              {item.get('step_code') === 'bindWithhold' &&
                item.get('withhold_first') && (
                  <p className={styles.type} onClick={showActionSheetType}>
                    {item.get('withhold_first')}
                  </p>
                )}
              {!content && <p className={styles.content}>{item.get('step_info')}</p>}
              {item.get('step_code') === 'payFirstCharge' &&
                total && (
                  <p className={styles.content}>
                    共{' '}
                    <span className={styles.price} onClick={showActionSheet}>
                      ¥{parseInt(total, 0)} >
                    </span>
                  </p>
                )}
            </Flex.Item>
            {item.get('step_status') ? (
              <Flex align="center" className={styles.done}>
                <Icon type={require('svg/xuan.svg')} className={styles.icon} /> 已完成
              </Flex>
            ) : (
              <p>未完成</p>
            )}
          </Flex>
        )
      })}
    </div>
  )
}

export default Step
