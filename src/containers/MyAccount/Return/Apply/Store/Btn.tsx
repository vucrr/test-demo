import { Modal } from 'antd-mobile'
import { Button, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Btn.less'

const alert = Modal.alert

interface BtnProps extends withLoadingProps {
  onSubmit: any
  query: any
  data: any
  enabled: boolean
}

class Btn extends React.Component<BtnProps> {
  handleClick = async () => {
    const { setLoading, onSubmit, data, query } = this.props
    const params = {
      trade_no: query.returnflow_trade_no,
      user_phone: data.get('user_phone'),
      ahs_store_id: query.store_id,
    }
    setLoading(true)
    const resultData = await onSubmit(params)
    setLoading(false)
    if (resultData) {
      await Router.replace({
        pathname: window.location.pathname,
        query: {
          sub_trade_no: resultData.sub_trade_no,
        },
      })
      alert(
        '申请成功',
        '还机后没手机用了？先租个新机用起来吧!',
        [
          {
            text: '暂不',
            onPress: () => {
              const trackEvent = {
                label: `${TrackEventMyAccountReturn.Detail.name1}`,
                category: TrackEventMyAccountReturn.Detail.category,
              }
              trackClickEvent(trackEvent)
            },
          },
          {
            text: '选新机',
            onPress: async () => {
              const trackEvent = {
                label: `${TrackEventMyAccountReturn.Detail.name2}`,
                category: TrackEventMyAccountReturn.Detail.category,
              }
              trackClickEvent(trackEvent)
              await Router.push('/product/category')
            },
          },
        ],
        'android',
      )
    }
  }
  render() {
    return (
      <Button fixed={true} disabled={!this.props.enabled} className={styles.btn} onClick={this.handleClick}>
        提交申请
      </Button>
    )
  }
}

export default withLoading(Btn)
