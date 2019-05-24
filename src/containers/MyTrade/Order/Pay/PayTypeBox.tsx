import { Flex, Modal } from 'antd-mobile'
import classnames from 'classnames'
import { Icon, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventLBF, TrackEventTradeDev } from 'configs/trackEventLabels'
import { fromJS } from 'immutable'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import { Query } from './'
import styles from './PayTypeBox.less'

interface PayTypeBoxProps extends withLoadingProps {
  query: Query
  list: any
  onOrderPayActions: any
  children: (params: { pisCode: string; submitText: string; query: Query; onOrderPayActions: any }) => React.ReactNode
}

interface PayTypeBoxState {
  curSelected: any
}

class PayTypeBox extends React.Component<PayTypeBoxProps, PayTypeBoxState> {
  readonly state: Readonly<PayTypeBoxState> = {
    curSelected:
      this.props.list
        .map((item: any) => item.get('pay_list'))
        .flatten(true)
        .find((item: any) => item.get('is_select')) || fromJS({}),
  }

  changeType = async (item: any) => {
    if (!item.get('is_select')) {
      trackClickEvent({ category: TrackEventTradeDev.PaymentCode.Name, label: item.get('pis_code') })
      const { query, setLoading, onOrderPayActions } = this.props
      this.setState({ curSelected: item })
      setLoading(true)
      await onOrderPayActions.fetchInfo({ trade_no: query.trade_no, pis_code: item.get('pis_code'), onChange: true })
      setLoading(false)
    }
  }

  Msg = (title: string, tips: string) => {
    trackClickEvent({ category: TrackEventLBF.Guarantee.category, label: TrackEventLBF.Guarantee.name })
    Modal.alert(title, tips, [{ text: '我知道了' }], 'android')
  }

  renderIcon = (items: any) => (
    <Icon
      type={require('svg/question-circle.svg')}
      className={styles.icon}
      color="#00A699"
      size="xxs"
      onClick={() => this.Msg(items.get('content_name'), items.get('content_tips'))}
    />
  )

  renderItem = (payList: any) => (
    <div className={styles.border_radius}>
      {payList.map((item: any, key: number) => {
        const { curSelected } = this.state
        const showTuijian = item.get('recommend_text') && item.get('recommend_text').length > 0
        const showReduce = item.get('guarantee_money') && +item.get('guarantee_money') > 0
        return (
          <div className={styles.item} key={key} onClick={() => this.changeType(item)}>
            <Flex>
              <img className={styles.icon} src={item.get('pay_icon')} />
              <Flex.Item className={styles.text}>
                {item.get('pay_name')}
                {showTuijian && <span className={styles.badge}>{item.get('recommend_text')}</span>}
              </Flex.Item>
              {curSelected.get('pis_code') !== item.get('pis_code') && <span className={classnames(styles.checkbox)} />}
              {curSelected.get('pis_code') === item.get('pis_code') && (
                <Icon size="xxs" color="#00A699" type={require('svg/right-circle-o.svg')} />
              )}
            </Flex>
            {showReduce && (
              <div className={styles.item_bottom}>
                <p className={styles.bref}>{item.get('pay_tips')}</p>
                {showReduce && <p className={styles.primary_text}>享首期还款立减{item.get('guarantee_money')}元</p>}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )

  render() {
    const { query, list, children, onOrderPayActions } = this.props
    const { curSelected } = this.state

    return (
      <>
        <div className={styles.pay_type_box}>
          {list.map((items: any, keys: number) => {
            return (
              <div className={styles.wrap_box} key={keys}>
                <Flex className={styles.title_box} align="center">
                  {items.name}
                  <span>{items.tips}</span>
                  {items.content_name && this.renderIcon(items)}
                </Flex>
                {this.renderItem(items.get('pay_list'))}
              </div>
            )
          })}
        </div>
        {children({
          pisCode: curSelected.get('pis_code'),
          submitText: curSelected.get('submit_text'),
          query,
          onOrderPayActions,
        })}
      </>
    )
  }
}

export default withLoading(PayTypeBox)
