import { Flex, Toast } from 'antd-mobile'
import { Button } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import Router from 'next/router'
import * as React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ButtonBox.less'
import { Query } from './index'
export interface ButtonBoxProps {
  trderNo: string
  query: Query
}

const Item = Flex.Item
const ButtonBox: React.FunctionComponent<ButtonBoxProps> = ({ trderNo, query }) => {
  const toLink = async () => {
    trackClickEvent({ category: TrackEventExchange.Remind.category, label: TrackEventExchange.Remind.name3 })
    await Router.push({
      pathname: '/mytrade/order/confirm',
      query: {
        ...query,
        no_replace: true,
      },
    })
  }
  const handleClick = async () => {
    trackClickEvent({ category: TrackEventExchange.Remind.category, label: TrackEventExchange.Remind.name4 })
    if (trderNo) {
      await Router.push(
        `/mytrade/exchange/confirm?contract_product_id=${
          query.contract_product_id
        }&old_trade_no=${trderNo}&vas_id=${query.vas_id || ''}`,
      )
    } else {
      Toast.info('请先选择一个服务中订单')
    }
  }
  return (
    <Flex className={styles.button}>
      <Item onClick={toLink}>暂不换，继续下单</Item>
      <Item>
        <Button fixed={true} type="primary" onClick={handleClick}>
          确认换机
        </Button>
      </Item>
    </Flex>
  )
}

export default ButtonBox
