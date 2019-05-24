import { ActionSheet, Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import React from 'react'
import popupStyles from 'themes/action-sheet.less'
import { trackClickEvent } from 'utils/piwik'
import styles from './OrderList.less'
export interface OrderListProps {
  selectTrade: Function
  trderNo: string
  info: any
  isSelect: Boolean
  trade_title: any
}
const Item = Flex.Item

export interface OrderListState {}

class OrderList extends React.Component<OrderListProps, OrderListState> {
  showActionSheet = (e: React.MouseEvent<SVGSVGElement>, text: any, tradeNo: string) => {
    e.stopPropagation()
    trackClickEvent({ category: TrackEventExchange.Remind.category, label: TrackEventExchange.Remind.name2 + tradeNo })
    const body = text.get('body') || []
    const BUTTONS: any = [
      <div className={popupStyles.popup_body_box} key="1">
        <Flex className={popupStyles.gray_text}>
          <Item>{text.get('head_text')}</Item>
        </Flex>
        {body.map((item: any, index: number) => {
          if (item.get('money') === '0') {
            return null
          }
          return (
            <Flex key={index}>
              <Item>{item.get('title')}</Item>
              <Item className={popupStyles.right_item}>{item.get('money')}</Item>
            </Flex>
          )
        })}
        <Flex className={styles.gray_red}>
          <Item>{text.get('body_tips')}</Item>
        </Flex>
      </div>,
    ]
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      title: (
        <div className={popupStyles.popup_title}>
          <span>分期明细</span>
          <Icon className={popupStyles.btn_close} type={require('svg/close.svg')} onClick={() => ActionSheet.close()} />
        </div>
      ),
      maskClosable: true,
      className: popupStyles.popup_box,
    })
  }

  render() {
    const { info, trderNo, isSelect, trade_title } = this.props
    return (
      <div className={styles.list}>
        <h4>{trade_title}</h4>
        {info.size &&
          info.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={classnames(styles.order, isSelect && trderNo === item.get('trade_no') && styles.select)}
                onClick={() => this.props.selectTrade(item.get('trade_no'))}
              >
                <p className={styles.choose}>已选</p>
                <Flex className={styles.orderInfo} align="center">
                  <img src={item.get('sku_small_img')} className={styles.img} alt="" />
                  <p>{item.get('alias')}</p>
                </Flex>
                <Flex className={styles.orderInfo} justify="between">
                  <p>{item.get('use_text')}</p>
                  <p>{item.get('use_time')}</p>
                </Flex>
                {item.get('early_return_money') !== 0 && (
                  <Flex className={styles.orderInfo} justify="between" align="start">
                    <div>
                      <Flex>
                        {item.get('early_return_text')}
                        <Icon
                          color="#00A699"
                          type={require('svg/question-circle.svg')}
                          className={styles.icon}
                          onClick={e => this.showActionSheet(e, item.get('early_return_tips'), item.get('trade_no'))}
                        />
                      </Flex>
                      <p className={styles.weak_prompt}>{item.get('early_return_text_tips')}</p>
                    </div>
                    <span>￥{item.get('early_return_money')}</span>
                  </Flex>
                )}
              </div>
            )
          })}
      </div>
    )
  }
}

export default OrderList
