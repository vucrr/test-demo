import { pay } from 'actions/myAccount/service/return-plan'
import { Accordion, Flex, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { withRouter } from 'next/router'
import * as React from 'react'
import { connect } from 'react-redux'
import { trackClickEvent } from 'utils/piwik'
import styles from './List.less'

interface ListProps {
  item: any
}

interface DetailProps {
  list: any
  pay: any
  type?: string
  router: any
}

const Item = Flex.Item

const Detail = ({
  list,
  pay,
  type,
  router: {
    query: { contract_no },
  },
}: DetailProps) => {
  const handleClick = (detail: any) => async () => {
    trackClickEvent(TrackEventMyCenter.RealRepayment)
    const planId = detail.get('plan_id')
    const tradeNo = detail.get('trade_no')
    const redirect = window.location.origin + window.location.pathname + '?contract_no=' + contract_no
    const data = await pay(redirect, planId, tradeNo)
    if (data.pay_type === 2) {
      Toast.info(data.pay_msg, 3, () => {
        location.reload()
      })
    } else if (data.pay_type === 1) {
      window.location.href = data.handleString
      // await AlipayTradePay({ orderStr: data.handleString })
    } else {
      Toast.info(data.errorMsg)
    }
  }

  const btns = (detail: any): { [key: number]: JSX.Element } => ({
    1: <p>{detail.get('repayment_type_desc')}</p>,
    2: (
      <p className={styles.pay} onClick={handleClick(detail)}>
        {detail.get('button_name')}
      </p>
    ),
  })

  return (
    <div className={styles.detailBox}>
      {list.map((detail: any, index: number) => {
        return (
          <Flex key={index} className={classnames(styles.detail, type && styles[type])} align="start" justify="between">
            {detail.get('period_desc') && <span>{detail.get('period_desc')}</span>}
            <Item>
              <p className={styles.price}>¥{detail.get('repayment_amount')}</p>
              <p>{detail.get('repayment_time')}</p>
            </Item>
            <Item className={styles.plan_status}>
              <p className={classnames(styles.state, detail.get('color_type') === 2 && styles.owe)}>
                {detail.get('repayment_status_desc')}
              </p>
              {btns(detail)[detail.get('operation_type')]}
            </Item>
          </Flex>
        )
      })}
    </div>
  )
}

const InjectedDetail = connect(
  null,
  { pay },
)(withRouter(Detail))

const DetailList = ({ item }: { item: any }) => {
  return (
    <>
      {!!item.get('buyout_list').size && <h4>买断记录</h4>}
      <InjectedDetail list={item.get('buyout_list')} />
      {!!item.get('returnflow_list').size && <h4>还机记录</h4>}
      <InjectedDetail list={item.get('returnflow_list')} type="return_list" />
      {!!item.get('trade_plan_list').size && <h4>还款记录</h4>}
      <InjectedDetail list={item.get('trade_plan_list')} />
    </>
  )
}

const Panel = Accordion.Panel

const renderCurrent = (current: any) => {
  if (
    !current.get('trade_plan_list').size &&
    !current.get('returnflow_list').size &&
    !current.get('buyout_list').size
  ) {
    return null
  }
  return (
    <>
      <h2>{current.getIn(['sku_info', 'sku_name'])}</h2>
      <DetailList item={current} />
    </>
  )
}

const renderHistoryList = (list: any) => {
  if (list.size === 0) return null
  return (
    <>
      <h2>历史订单</h2>
      {list.map((item: any, index: number) => {
        return (
          <Accordion key={index} defaultActiveKey={`${index}`}>
            <Panel header={item.getIn(['sku_info', 'sku_name'])}>
              <div className={styles.historyList}>
                <DetailList item={item} />
              </div>
            </Panel>
          </Accordion>
        )
      })}
    </>
  )
}

const List: React.FunctionComponent<ListProps> = ({ item }) => {
  return (
    <div className={styles.list}>
      {renderCurrent(item.get('current'))}
      {renderHistoryList(item.get('historyList'))}
    </div>
  )
}

export default List
