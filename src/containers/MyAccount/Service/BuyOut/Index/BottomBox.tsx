import { Flex, Modal } from 'antd-mobile'
// import classnames from 'classnames'
import { Button, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import React from 'react'
import styles from './BottomBox.less'

const alert = Modal.alert
const Item = Flex.Item

interface BottomBoxProps {
  buyout: any
  onBuyOutActions: any
  tradeNo: string
}

const BottomBox = ({ buyout, onBuyOutActions, tradeNo, loading, setLoading }: BottomBoxProps & withLoadingProps) => {
  const handleClick = () => {
    alert(
      '买断确认',
      buyout.get('alert_msg'),
      [
        { text: '暂不提交' },
        {
          text: '提交',
          onPress: async () => {
            setLoading(true)
            await onBuyOutActions.submitBuyOut({ trade_no: tradeNo })
            setLoading(false)
          },
        },
      ],
      'android',
    )
  }

  // 买断金额为0 || (押金抵扣不为0 && 另需支付为0，无需额外支付)
  if (+buyout.get('buyoutPrice') === 0 || (+buyout.get('frozen_to_payprice') > 0 && +buyout.get('buyoutFee') === 0)) {
    return (
      <Flex className={styles.bottom_box}>
        <Item>
          <Button disabled={loading} fixed={true} type="primary" onClick={handleClick}>
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
          ￥{+buyout.get('frozen_to_payprice') === 0 ? buyout.get('buyoutPrice') : buyout.get('buyoutFee')}
        </span>
      </div>
      <Item>
        <Button disabled={loading} fixed={true} type="primary" onClick={handleClick}>
          立即支付
        </Button>
      </Item>
    </Flex>
  )
}

export default withLoading(BottomBox)
