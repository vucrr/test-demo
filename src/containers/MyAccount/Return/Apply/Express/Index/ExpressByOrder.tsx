import { List } from 'antd-mobile'
import { Icon, Link, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ExpressType.less'
import TimeSelector from './TimeSelector'

const Item = List.Item
const Brief = Item.Brief

export interface ExpressByOrderProps extends withLoadingProps {
  query: any
  onExpress: any
  expressInfo: any
  expressType: number
  toggleTypeSelector: any
  isDetailPage: boolean
}

export interface ExpressByOrderState {
  showTimeModal: boolean
  timeList: any
  pickUpUser: any
  pickUpAddress: any
  Time: any
  timeIndex: string
}

export class ExpressByOrder extends React.Component<ExpressByOrderProps, ExpressByOrderState> {
  state: ExpressByOrderState = {
    showTimeModal: false,
    timeIndex: '',
    timeList: [],
    pickUpUser: '',
    pickUpAddress: '',
    Time: this.props.expressInfo.getIn(['expressTime', 'time']) || '',
  }

  toggleTimeSelector = async () => {
    const { showTimeModal } = this.state
    const { setLoading } = this.props
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name4}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    if (!showTimeModal) {
      trackClickEvent(trackEvent)
      setLoading(true)
      const timeList = await this.props.onExpress.fetchSchedule()
      this.setState({
        timeList,
      })
      setLoading(false)
    }
    this.setState({ showTimeModal: !this.state.showTimeModal })
  }

  onChangeTime = async (value: any) => {
    const showTime = `${value.tabTitle}  ${value.time || this.state.Time}`
    await this.toggleTimeSelector()
    this.props.onExpress.changeExpressTime({
      showTime,
      pickUpTime: value.pickUpTime,
      time: value.time,
    })
  }

  render() {
    const { expressInfo, query, toggleTypeSelector, isDetailPage } = this.props
    const expressAddress = expressInfo.get('expressAddress')
    const mapAddressInfo = expressAddress.get('address')
    const userInfo = expressAddress.get('user')
    const { showTimeModal } = this.state
    const showTime = expressInfo.getIn(['expressTime', 'showTime']) || ''
    const pickUpTime = expressInfo.getIn(['expressTime', 'pickUpTime']) || ''
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name5}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    if (isDetailPage) {
      return null
    }
    return (
      <div>
        <div className={styles.typeBox}>
          <div className={styles.info}>
            <Icon type={require('svg/door.svg')} className={styles.icon} />
            <div>
              <p className={styles.title}>
                预约上门取件<span className={styles.tag}>免邮费</span>
              </p>
              <p className={styles.tips}>一小时内上门 享换机推荐</p>
            </div>
          </div>
          <div className={styles.change} onClick={toggleTypeSelector}>
            更改寄件方式
          </div>
        </div>
        <div className={styles.appointmentBox}>
          <List>
            <div onClick={this.toggleTimeSelector}>
              <Item arrow="horizontal">
                取件时间
                <Brief>{showTime === '' ? '请选择取件时间' : showTime}</Brief>
              </Item>
            </div>
            <TimeSelector
              show={showTimeModal}
              onClose={this.toggleTimeSelector}
              onChangeTime={this.onChangeTime}
              timeList={this.state.timeList}
              chooseTime={pickUpTime}
            />
            <Link
              to={`/myaccount/return/apply/express/address?returnflow_trade_no=${query.returnflow_trade_no}`}
              trackEvent={trackEvent}
            >
              <Item arrow="horizontal">
                取件地址
                {!userInfo ? (
                  <Brief>请选择取件地址</Brief>
                ) : (
                  <Brief>
                    <p className={styles.user_info}>{`${userInfo.get('contact')} ${userInfo
                      .get('phone')
                      .substring(0, 3)}****${userInfo.get('phone').substring(7)}`}</p>
                    {mapAddressInfo.get('province') +
                      mapAddressInfo.get('city') +
                      mapAddressInfo.get('county') +
                      mapAddressInfo.get('address') +
                      mapAddressInfo.get('detail_address') +
                      userInfo.get('house_number')}
                  </Brief>
                )}
              </Item>
            </Link>
          </List>
        </div>
      </div>
    )
  }
}

export default withLoading(ExpressByOrder)
