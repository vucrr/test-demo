import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import { TrackEventRentWithholding } from 'configs/trackEventLabels'
import React, { useState } from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './Empty.less'
import Popup from './Popup'

export interface EmptyProps {
  showAddBtn: 0 | 1 // 1可以添加新代扣方式,0不可添加
  popup: any
  onWithHoldingActions: any
}

const Empty = ({ showAddBtn, popup, onWithHoldingActions }: EmptyProps) => {
  const [showPopup, setShowPopup] = useState(false)

  const handleToggle = (showPopup: boolean, track?: TrackClickEventProperties) => {
    if (track) trackClickEvent(track)
    setShowPopup(showPopup)
  }

  return (
    <Flex className={styles.empty} direction="column">
      <Icon className={styles.icon} type={require('svg/nodata.svg')} />
      <p>您暂时还没有签过租金代扣服务</p>
      {!!showAddBtn && (
        <div className={styles.btn_box}>
          <span
            className={styles.btn_add}
            onClick={() =>
              handleToggle(true, {
                ...TrackEventRentWithholding.RentMethodManagement,
                label: 'AddRentMethod',
              })
            }
          >
            新增代扣方式 &gt;
          </span>
        </div>
      )}
      <Popup popup={popup} show={showPopup} onClose={handleToggle} onWithHoldingActions={onWithHoldingActions} />
    </Flex>
  )
}

export default Empty
