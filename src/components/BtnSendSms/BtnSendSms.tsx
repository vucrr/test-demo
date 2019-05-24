import { Toast } from 'antd-mobile'
import classnames from 'classnames'
import React, { useEffect, useState } from 'react'
import { delayHandle } from 'utils/tools'
import styles from './BtnSendSms.less'

export interface BtnSendSmsProps {
  className?: string
  onValidAndSend: (resolve: (isValid: boolean) => void) => Promise<void>
}

let isClick = false

const BtnSendSms: React.FunctionComponent<BtnSendSmsProps> = ({ className, onValidAndSend }) => {
  const tickTotal = 60
  const [tick, setTick] = useState(tickTotal)
  const [isTick, setIsTick] = useState(false)
  const [btnText, setBtnText] = useState('获取验证码')

  const clearTick = () => {
    setIsTick(false)
    setTick(tickTotal)
  }

  const tickTime = async () => {
    if (isTick && tick > 0) {
      tick < tickTotal && (await delayHandle(1))
      setTick(tick - 1)
    } else {
      clearTick()
    }
  }

  useEffect(() => {
    return clearTick
  }, [])

  useEffect(
    () => {
      // tslint:disable-next-line
      tickTime()
    },
    [isTick, tick],
  )

  const handleSend = async () => {
    if (isTick || isClick) {
      return
    }
    isClick = true
    const isValid = await new Promise<boolean>((resolve: (isValid: boolean) => void) => {
      return onValidAndSend(resolve)
    })
    if (isValid) {
      setIsTick(true)
      setBtnText('重新获取')
      Toast.info('验证码发送成功！请登录邮箱查看')
    }
    isClick = false
  }

  return (
    <div className={classnames(styles.btn_sms, className, { [styles.is_tick]: isTick })} onClick={handleSend}>
      {isTick ? `${tick}s` : btnText}
    </div>
  )
}

export default BtnSendSms
