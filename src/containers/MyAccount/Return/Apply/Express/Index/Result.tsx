import { List, Modal, Toast } from 'antd-mobile'
import { Icon, Link, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Result.less'
import TimeSelector from './TimeSelector'
import { expressTypeList } from './index'

const alert = Modal.alert
const Item = List.Item
const Brief = Item.Brief

export interface ResultProps extends withLoadingProps {
  expressInfo: any
  query: any
  onExpress: any
  orderType: number
  returnflow_trade_no: string
}

export interface ResultState {
  showTimeModal: boolean
  timeList: any
}

class Result extends React.Component<ResultProps, ResultState> {
  state = {
    showTimeModal: false,
    timeList: [],
  }

  onCancel = async (tradeNo?: any) => {
    if (tradeNo) {
      const trackEvent = {
        label: `${TrackEventMyAccountReturn.Detail.name9}`,
        category: TrackEventMyAccountReturn.Detail.category,
      }
      trackClickEvent(trackEvent)
    }
    this.props.setLoading(true)
    await this.props.onExpress.cancelReturn({ sub_trade_no: this.props.query.sub_trade_no, ...tradeNo })
    this.props.setLoading(false)
  }
  componentWillUnmount() {
    this.props.setLoading(false)
  }
  handleCancel = () => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Detail.name3}`,
      category: TrackEventMyAccountReturn.Detail.category,
    }
    trackClickEvent(trackEvent)
    alert(
      '取消申请',
      '您确认要取消邮寄还机申请吗？',
      [
        {
          text: '暂不取消',
          onPress: () => {
            const trackEvent = {
              label: `${TrackEventMyAccountReturn.Detail.name5}`,
              category: TrackEventMyAccountReturn.Detail.category,
            }
            trackClickEvent(trackEvent)
          },
        },
        {
          text: '确定',
          onPress: async () => {
            const trackEvent = {
              label: `${TrackEventMyAccountReturn.Detail.name6}`,
              category: TrackEventMyAccountReturn.Detail.category,
            }
            trackClickEvent(trackEvent)
            await this.onCancel()
          },
        },
      ],
      'android',
    )
  }

  onChangeTime = async (value: any) => {
    const { sub_trade_no } = this.props.query
    const orderTime = this.props.expressInfo.getIn(['detail', 'deliverInfo', 'ordered_time'])
    if (value.pickUpTime === orderTime) {
      Toast.info('您没有做任何修改哟', 2)
    } else {
      await this.props.onExpress.changePickUp({
        sub_trade_no,
        time: value.pickUpTime,
      })
    }
    await this.toggleTimeSelector()
  }

  toggleTimeSelector = async () => {
    const { showTimeModal } = this.state
    const { setLoading } = this.props
    if (!showTimeModal) {
      const trackEvent = {
        label: `${TrackEventMyAccountReturn.Detail.name4}`,
        category: TrackEventMyAccountReturn.Detail.category,
      }
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

  render() {
    const { showTimeModal } = this.state
    // 上门取件 byOrder
    const { byOrder, bySelf } = expressTypeList
    const detail = this.props.expressInfo.get('detail')
    const way = detail.get('express_type')
    const deliverInfo = detail.get('deliverInfo')
    const trackEventPhone = {
      label: `${TrackEventMyAccountReturn.Detail.name7}`,
      category: TrackEventMyAccountReturn.Detail.category,
    }
    const trackEventDetail = {
      label: `${TrackEventMyAccountReturn.Detail.name8}`,
      category: TrackEventMyAccountReturn.Detail.category,
    }
    return (
      <>
        {way === byOrder && (
          <>
            <div className={styles.resultBox}>
              <div className={styles.body}>
                <div className={styles.content}>
                  <p className={styles.title}>{deliverInfo.get('statusTxt')}</p>
                  {deliverInfo.get('timeForStatusMsg') ? (
                    <p className={styles.tips}>
                      取件员将在 <span>{deliverInfo.get('timeForStatusMsg')}</span> 上门取件，请保持手机畅通
                    </p>
                  ) : (
                    <p className={styles.tips} dangerouslySetInnerHTML={{ __html: deliverInfo.get('statusMsg') }} />
                  )}
                </div>
                <img className={styles.icon} src={deliverInfo.get('statusPic')} />
              </div>
              <div className={styles.footer}>
                {deliverInfo.get('showCallBtn') && (
                  <Link
                    to={`tel:${deliverInfo.get('deliver_phone')}`}
                    className={styles.btnCall}
                    trackEvent={trackEventPhone}
                  >
                    <img src={require('images/myaccount/return/person.png')} className={styles.iconPerson} />
                    {deliverInfo.get('deliver_name')}
                    <Icon type={require('svg/phone-fill.svg')} className={styles.iconPhone} />
                  </Link>
                )}

                <div className={styles.btns}>
                  {deliverInfo.get('showReorderBtn') && (
                    <div
                      className={styles.btn}
                      onClick={() => this.onCancel({ returnflow_trade_no: this.props.returnflow_trade_no })}
                    >
                      重新申请
                    </div>
                  )}
                  {deliverInfo.get('showCancelBtn') && (
                    <div className={styles.btn} onClick={this.handleCancel}>
                      取消申请
                    </div>
                  )}
                  {deliverInfo.get('showChangeBtn') && (
                    <>
                      <div className={styles.btn} onClick={this.toggleTimeSelector}>
                        修改取件时间
                      </div>
                      <TimeSelector
                        show={showTimeModal}
                        onClose={this.toggleTimeSelector}
                        onChangeTime={this.onChangeTime}
                        timeList={this.state.timeList}
                        chooseTime={deliverInfo.get('ordered_time')}
                      />
                    </>
                  )}
                  {deliverInfo.get('showRouteBtn') && (
                    <Link
                      to={`/myaccount/return/apply/express/detail?sub_trade_no=${this.props.query.sub_trade_no}`}
                      className={styles.btn}
                      trackEvent={trackEventDetail}
                    >
                      查看物流
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <Item className={styles.addressBox}>
              取件地址
              <Brief>
                <p className={styles.userInfo}>{`${deliverInfo.get('name')}   ${deliverInfo
                  .get('phone')
                  .substring(0, 3)}****${deliverInfo.get('phone').substring(7)}`}</p>
                {deliverInfo.get('province') +
                  deliverInfo.get('city') +
                  deliverInfo.get('county') +
                  deliverInfo.get('address')}
              </Brief>
            </Item>
          </>
        )}
        {way === bySelf && (
          <div className={styles.resultBox}>
            <div className={styles.body}>
              <div className={styles.content}>
                <p className={styles.title}>成功提交申请</p>
                <p className={styles.tips}>
                  请确保物流在 <span className={styles.highlight}> {detail.get('return_end_date')} </span>前送达
                </p>
              </div>
              <img className={styles.icon} src={require('images/myaccount/return/clock.png')} />
            </div>
            {this.props.orderType === 1 && (
              <div className={styles.footer}>
                <div className={styles.btns}>
                  <div className={styles.btn} onClick={this.handleCancel}>
                    取消申请
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )
  }
}

export default withLoading(Result)
