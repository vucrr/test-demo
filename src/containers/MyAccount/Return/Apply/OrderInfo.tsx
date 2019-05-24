import { Flex } from 'antd-mobile'
import { Icon, PopupModal } from 'components'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './OrderInfo.less'
interface OrderInfoProps {
  data: any
}

interface OrderInfoState {
  show: boolean
}

class OrderInfo extends React.Component<OrderInfoProps, OrderInfoState> {
  state = {
    show: false,
  }
  handleToggleModal = () => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name6}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    if (!this.state.show) {
      trackClickEvent(trackEvent)
    }
    this.setState({ show: !this.state.show })
  }
  render() {
    const { show } = this.state
    const { data } = this.props
    const skuInfo = data.get('sku_info')
    const priceList = data.get('price_list')
    const priceInfo = data.get('price_info')
    const returnPrice = priceInfo.get('return_price')
    return (
      <div className={styles.orderBox}>
        <img src={skuInfo.get('sku_img')} className={styles.img} />
        <div className={styles.content}>
          <p className={styles.name}>{skuInfo.get('sku_name')}</p>
          <p>已用时长：{data.get('used_time')}个月</p>
          <p>到期时间：{data.get('trade_end_date')}</p>
          {returnPrice > 0 && (
            <Flex align="center" className={styles.price}>
              支付金额：￥{returnPrice}
              <Icon
                type={require('svg/question-circle.svg')}
                className={styles.icon_question}
                onClick={this.handleToggleModal}
              />
            </Flex>
          )}
        </div>
        <PopupModal title="费用明细" visible={show} onClose={this.handleToggleModal} className={styles.popup}>
          <p>支付金额包含以下费用：</p>
          {priceList &&
            priceList.map((item: any, index: number) => (
              <div className={styles.fee} key={index}>
                {item.get('name')}
                <span>￥{item.get('amount')}</span>
              </div>
            ))}
          <p>费用将会优先使用您的账户余额、已冻结押金部分抵扣</p>
        </PopupModal>
      </div>
    )
  }
}

export default OrderInfo
