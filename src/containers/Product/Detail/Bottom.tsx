import { Flex, Modal } from 'antd-mobile'
import { Button, Icon, withAuth } from 'components'
import { AuthProps } from 'components/withAuth'
import { TrackEventProductDetail } from 'configs/trackEventLabels'
import Router, { withRouter } from 'next/router'
import React from 'react'
import { compose } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import styles from './Bottom.less'

const Item = Flex.Item

interface BottomProps extends AuthProps {
  selectedList?: string
  curIdActivity: string
  idActivity: string
  price: string
  onDetailActions: any
  children: any
  router: any
}

class Bottom extends React.Component<BottomProps, { showPopup: boolean; loading: boolean }> {
  readonly state = {
    loading: false,
    showPopup: false,
    notice: {
      icon: require('svg/alarm.svg'),
      text: '降价提醒',
    },
  }

  async componentDidMount() {
    const {
      selectedList,
      onDetailActions,
      router: { query },
    } = this.props
    if (query.reduction) {
      Modal.alert(
        '温馨提示',
        '当该商品租金降价（小于' + this.props.price + '元/月）将通过短信推送及时提醒您，需要开启推送吗？',
        [{ text: '残忍拒绝' }, { text: '立即开启', onPress: this.handlePressOn }],
        'android',
      )
    }
    if (selectedList) {
      await this.showPopup(true)
      onDetailActions.changePropertyItemDefaultSelected({ selectedList })
    }
  }

  togglePopup = (e: React.MouseEvent<HTMLDivElement> | null, status: boolean) => {
    if (e) e.preventDefault() // 修复 Android 上点击穿透
    this.setState({ showPopup: status })
  }

  showPopup = async (status: boolean) => {
    trackClickEvent({ category: TrackEventProductDetail.Name, label: TrackEventProductDetail.Bottom.Item1 })
    const { curIdActivity, idActivity, onDetailActions } = this.props
    if (curIdActivity !== idActivity) {
      this.setState({ loading: true })
      await onDetailActions.fetchProperty({ idActivity: curIdActivity })
    }
    this.setState({ showPopup: status, loading: false })
  }

  handlePressOn = () => {
    const query: any = {
      activityId: this.props.curIdActivity,
      price: this.props.price,
    }
    if (query.price === 0) {
      console.log(`降价通知出错啦-activityId:${query.activityId}`)
    }
    this.props.onDetailActions.noticeForReduction(query)
  }

  togglePopupWithTrack = async (e: any, status: boolean) => {
    e.preventDefault() // 修复 Android 上点击穿透
    await this.showPopup(status)
  }
  track = async () => {
    trackClickEvent({ category: TrackEventProductDetail.Name, label: TrackEventProductDetail.Bottom.Help })
    await Router.push({ pathname: '/help/index' })
  }
  track1 = () => {
    trackClickEvent({ category: TrackEventProductDetail.Name, label: TrackEventProductDetail.Bottom.Remind })
    Modal.alert(
      '温馨提示',
      '当该商品租金降价（小于' + this.props.price + '元/月）将通过短信推送及时提醒您，需要开启推送吗？',
      [{ text: '残忍拒绝' }, { text: '立即开启', onPress: this.handlePressOn }],
      'android',
    )
  }
  render() {
    const { showPopup, loading } = this.state
    return (
      <>
        <Flex className={styles.bottom_box} align="center" justify="center">
          <Item className={styles.left_box} onClick={() => this.track()}>
            <div className={styles.icon_box}>
              <Icon className={styles.icon} type={require('svg/bang.svg')} />帮助
            </div>
          </Item>
          <Item className={styles.left_box}>
            <a href="tel:400-670-0188" className={styles.icon_box}>
              <Icon className={styles.icon} type={require('svg/call.svg')} />客服
            </a>
          </Item>
          <Item className={styles.left_box} onClick={() => this.track1()}>
            <div className={styles.icon_box}>
              <Icon className={styles.icon} type={this.state.notice.icon} />
              {this.state.notice.text}
            </div>
          </Item>
          <Button
            loading={loading}
            disabled={loading}
            className={styles.btn_red}
            safeArea={true}
            onClick={e => this.togglePopupWithTrack(e, true)}
          >
            马上拥有
          </Button>
        </Flex>
        {this.props.children({ show: showPopup, togglePopup: this.togglePopup })}
      </>
    )
  }
}

export default compose(
  withAuth,
  withRouter,
)(Bottom) as React.ReactType
