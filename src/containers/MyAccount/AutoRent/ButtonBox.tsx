import { Modal } from 'antd-mobile'
import { Button } from 'components'
import React from 'react'
import styles from './ButtonBox.less'

const alert = Modal.alert

interface ButtonBoxProps {
  info: any
  btnDisabled: boolean
  onAutoRentActions: any
  query: {
    trade_no: string
    userSign?: '1'
  }
}

const ButtonBox = ({ info, btnDisabled, onAutoRentActions, query }: ButtonBoxProps) => {
  if (info.get('is_auto_rent') === 1) {
    return null
  }

  const handleClick = () => {
    alert(
      '续租确认',
      '确认开启自动续租，享受续租服务吗？',
      [
        { text: '暂不' },
        {
          text: '确定',
          onPress: async () => {
            onAutoRentActions.setDisabled({ disabled: true })
            if (!info.get('is_withhold')) {
              // 尚未签订代扣
              onAutoRentActions.userSign({ trade_no: query.trade_no })
            } else {
              if (info.get('is_frozen')) {
                // 信用卡冻结支付&&开启自动续租
                await onAutoRentActions.frozenAutoRentAndOpen({ trade_no: query.trade_no })
              } else {
                // 花呗直接开启自动续租
                await onAutoRentActions.openAutoRent({ trade_no: query.trade_no })
              }
            }
          },
        },
      ],
      'android',
    )
  }

  return (
    <div className={styles.button_box}>
      <Button type="primary" onClick={handleClick} disabled={btnDisabled}>
        立即开启
      </Button>
    </div>
  )
}

export default ButtonBox
