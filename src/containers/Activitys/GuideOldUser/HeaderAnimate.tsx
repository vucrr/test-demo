import { Flex } from 'antd-mobile'
import cx from 'classnames'
import { AudioWidget } from 'components'
import { AudioWidgetStatus } from 'components/AudioWidget/AudioWidget'
import React from 'react'
import Lottie from 'react-lottie'
import { assetPrefix } from 'utils/config'
import styles from './HeaderAnimate.less'

export interface HeaderAnimateProps {
  showHour: boolean
  day: any
  hour: any
  showExpired: boolean
  product_name: string
}

export interface HeaderAnimateState {}

class HeaderAnimate extends React.Component<HeaderAnimateProps, HeaderAnimateState> {
  renderAudio = ({ toggle, status }: any) => {
    switch (status) {
      case AudioWidgetStatus.Playing:
        return (
          <img
            onClick={toggle}
            className={cx(styles.bg_music, styles.bgMusicPlaying)}
            src={require('images/activity/guild-old-user/music_icon.png')}
            alt=""
          />
        )
      case AudioWidgetStatus.Loaded:
      case AudioWidgetStatus.Paused:
        return (
          <img
            onClick={toggle}
            className={styles.bg_music}
            src={require('images/activity/guild-old-user/music_icon.png')}
            alt=""
          />
        )
      case AudioWidgetStatus.Loading:
        return <div>loading...</div>
      default:
        return <></>
    }
  }
  render() {
    const LottieProps = {
      options: {
        loop: true,
        autoplay: true,
        animationData: require('./data/oldUser').default,
      },
      width: '100%',
      height: '100%',
    }
    const { day, hour, showHour, showExpired, product_name } = this.props
    return (
      <div className={styles.headeranimate}>
        <AudioWidget src={`${assetPrefix}/static/json/activitys-old-user.mp3`} autoplay={true} loop={true}>
          {this.renderAudio}
        </AudioWidget>
        <div className={styles.header_box}>
          <p className={styles.tips}>您的{product_name}距离到期仅剩</p>
          <Flex align="end" justify="center" className={styles.timeBox}>
            <div className={styles.timeNum}>{day.slice(0, 1)}</div>
            <div className={cx(styles.timeNum, styles.dayNUmright)}>{day.slice(1, 2)}</div>
            <p className={styles.day}>天</p>
            {showHour && <div className={cx(styles.timeNum, styles.houeLeft)}>{hour.slice(0, 1)}</div>}
            {showHour && <div className={styles.timeNum}>{hour.slice(1, 2)}</div>}
            {showHour && <p className={styles.day}>时</p>}
          </Flex>
          {showExpired && <div className={styles.expired}>已过期</div>}
        </div>

        <div className={styles.lottie_box}>
          <Lottie {...LottieProps} />
        </div>
      </div>
    )
  }
}

export default HeaderAnimate
