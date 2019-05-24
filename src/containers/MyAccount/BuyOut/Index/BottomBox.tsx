import { Flex, Modal } from 'antd-mobile'
// import classnames from 'classnames'
import { Button } from 'components'
import React from 'react'
import styles from './BottomBox.less'

const alert = Modal.alert
const Item = Flex.Item

interface BottomBoxProps {
  buyout: any
  onBuyOutActions: any
  tradeNo: string
  btnDisabled: boolean
}

const BottomBox = ({ buyout, onBuyOutActions, tradeNo, btnDisabled }: BottomBoxProps) => {
  const handleClick = () => {
    alert(
      '买断确认',
      '提交买断申请后不可取消哦，你确认要买断吗？',
      [
        { text: '暂不提交' },
        {
          text: '提交',
          onPress: () => {
            onBuyOutActions.submitBuyOut({ trade_no: tradeNo })
          },
        },
      ],
      'android',
    )
  }

  // 买断金额为0 || (押金抵扣不为0 && 另需支付为0，无需额外支付)
  if (
    +buyout.get('buyout_price') === 0 ||
    (+buyout.get('frozen_to_pay_price') > 0 && +buyout.get('actual_buyout_price') === 0)
  ) {
    return (
      <Flex className={styles.bottom_box}>
        <Item>
          <Button fixed={true} type="primary" onClick={handleClick} disabled={btnDisabled}>
            立即买断
          </Button>
        </Item>
      </Flex>
    )
  }

  return (
    <Flex className={styles.bottom_box}>
      <div className={styles.left}>
        {/* 当押金抵扣为0时显示买断金额，否则显示另需支付 */}
        支付金额<span>
          ￥{+buyout.get('frozen_to_pay_price') === 0 ? buyout.get('buyout_price') : buyout.get('actual_buyout_price')}
        </span>
      </div>
      <Item>
        <Button fixed={true} type="primary" onClick={handleClick} disabled={btnDisabled}>
          立即支付
        </Button>
      </Item>
    </Flex>
  )
}

export default BottomBox
