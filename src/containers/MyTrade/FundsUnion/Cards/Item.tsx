import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { List, Radio } from 'antd-mobile'
import { withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import Router from 'next/router'
import qs from 'querystring'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Item.less'

interface ItemProps extends withLoadingProps {
  list: any
  onFundsUnionActions: any
  query: CreateStrategyPayParams
}

interface ItemState {
  checkedIndex: any
}

const RadioItem = Radio.RadioItem

class Item extends React.Component<ItemProps, ItemState> {
  state = {
    checkedIndex: '',
  }

  onChange = async (index: number) => {
    this.setState({ checkedIndex: index })
    const { list, query, onFundsUnionActions, setLoading } = this.props
    const thisItem = list.get(index)
    const params = {
      payNo: query.pay_no,
      idCard: thisItem.get('idNo'),
      userName: thisItem.get('realName'),
      tel: thisItem.get('tel'),
      cardNo: thisItem.get('card'),
    }
    setLoading(true)
    trackClickEvent({ category: TrackEventFundsUnion.ChooseCard.Name, label: params.cardNo })
    const data = await onFundsUnionActions.fetchOTP(params)
    onFundsUnionActions.saveFormFields({
      form: {
        tel: thisItem.get('tel'),
      },
    })
    setLoading(false)
    if (data) {
      onFundsUnionActions.getBillNo(data)
      await Router.push(`/mytrade/funds-union/check-card?formStatus=2&sendSms=true&&${qs.stringify(query)}`)
    }
  }

  render() {
    const { checkedIndex } = this.state
    const { list } = this.props
    return (
      <div className={styles.list_box}>
        <List>
          {list.map((item: any, index: any) => (
            <RadioItem
              key={index}
              className={styles.item}
              checked={index === checkedIndex}
              onChange={() => this.onChange(index)}
            >
              <img className={styles.icon} src={item.get('icon')} />
              {item.get('bankName')}
              （{item.get('bankCardNo').slice(-4)}）
            </RadioItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withLoading<ItemProps>(Item)
