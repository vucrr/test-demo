import { Modal } from 'antd-mobile'
import { withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Result.less'

const alert = Modal.alert

interface Props extends withLoadingProps {
  cancel: Function
  data: any
  storeInfo: any
  query: any
  orderType: any
}

class Result extends React.Component<Props> {
  onCancel = async () => {
    const { setLoading, cancel, query } = this.props
    setLoading(true)
    await cancel({ sub_trade_no: query.sub_trade_no })
    setLoading(false)
  }

  handleClick = () => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Detail.name3}`,
      category: TrackEventMyAccountReturn.Detail.category,
    }
    trackClickEvent(trackEvent)
    const { storeInfo } = this.props
    alert(
      '取消申请',
      `您确认要取消到${storeInfo.store_name}的还机申请吗？`,
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
  render() {
    const { data, storeInfo, orderType } = this.props
    return (
      <div className={styles.resultBox}>
        <div className={styles.body}>
          <div className={styles.content}>
            <p className={styles.title}>成功提交申请</p>
            <p className={styles.tips}>
              请在申请后<span className={styles.highlight}>{data.getIn(['deliverInfo', 'timeForStatusMsg'])}天</span>内到{
                storeInfo.store_name
              }还机
            </p>
          </div>
          <img className={styles.icon} src={require('images/myaccount/return/clock.png')} />
        </div>
        {orderType === 1 && (
          <div className={styles.footer}>
            <div className={styles.btn} onClick={this.handleClick}>
              取消申请
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withLoading<Props>(Result)
