import { Button, Icon } from 'components'
import React, { MouseEvent, useEffect } from 'react'
import LoadScript from 'utils/loadScript'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './CSButtons.less'

interface CSButtonsProps {
  trackEvents?: TrackClickEventProperties[] // 先在线后电话
}

function CSButtons({ trackEvents }: CSButtonsProps) {
  useEffect(function() {
    const script = new LoadScript('//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9593', 'nTalk')
    void script.load()
  })

  function call() {
    if (trackEvents && trackEvents.length) {
      trackClickEvent(trackEvents[1])
    }
    location.href = 'tel:400-670-0188'
  }

  function handleClick(e: MouseEvent<HTMLSpanElement>) {
    e.preventDefault()
    if (trackEvents && trackEvents.length) {
      trackClickEvent(trackEvents[0])
    }
    NTKF.im_openInPageChat()
  }

  return (
    <div className={styles.container}>
      <p>
        <span>如有疑问，请联系享换机客服，服务时间 9:00-21:00</span>
      </p>
      <div className={styles.buttons}>
        <Button className={styles.btn} onClick={handleClick}>
          <Icon size="xxs" type={require('svg/service-kefu-cs.svg')} color="#666" />
          <span>在线客服</span>
        </Button>
        <Button className={styles.btn} onClick={call}>
          <Icon size="xxs" type={require('svg/phone.svg')} color="#666" />
          <span>电话客服</span>
        </Button>
      </div>
    </div>
  )
}

export default CSButtons
