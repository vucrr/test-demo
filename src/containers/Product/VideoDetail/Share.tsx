import { Toast } from 'antd-mobile'
import { Copy, Icon, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import React from 'react'
// import wechat from 'utils/wechat'
import styles from './Share.less'

interface Props {
  shareInfo: any
}

interface State {
  url: string
}

class Share extends React.Component<Props & SourceProps, State> {
  state = {
    url: '',
  }

  shareInfo = this.props.shareInfo

  shareInfoApp = {
    title: this.shareInfo.get('title'),
    content: this.shareInfo.get('desc'),
    url: this.state.url,
    img: this.shareInfo.get('pic'),
  }

  isWechat = this.props.ua.get('isWechat')
  isAlipay = this.props.ua.get('isAlipay')
  isApp = this.props.ua.get('isApp')
  isAndroidApp = this.props.ua.get('isAndroidApp')
  isIOSApp = this.props.ua.get('isIOSApp')

  componentDidMount() {
    this.setState({
      url: window.location.href,
    })

    if (this.isWechat) {
      const { share } = require('utils/wechat')
      share({
        title: this.shareInfoApp.title,
        desc: this.shareInfoApp.content,
        imgUrl: this.shareInfoApp.img,
        link: window.location.href,
      })
    }

    if (this.isAlipay) {
      const { initShare } = require('utils/alipayShare')
      initShare({
        title: this.shareInfoApp.title,
        content: this.shareInfoApp.content,
        image: this.shareInfoApp.img,
        url: this.state.url,
      })
    }
  }

  handleAppShare = () => {
    this.shareInfoApp.url = this.state.url
    const stringObj = JSON.stringify(this.shareInfoApp)
    if (this.isAndroidApp) {
      // 调用安卓App分享
      window.jsObj.startShare(stringObj)
    } else {
      // 调用iosApp分享
      window.webkit.messageHandlers.startShare.postMessage(stringObj)
    }
  }

  handleWechatShare = () => {
    Toast.info('点击右上角分享给好友', 1.5)
  }

  handleAlipayShare = () => {
    const { alipayShare } = require('utils/alipayShare')
    alipayShare({
      title: this.shareInfoApp.title,
      content: this.shareInfoApp.content,
      image: this.shareInfoApp.img,
      url: this.state.url,
    })
  }

  onClickCopy = () => {
    Toast.info('复制成功，请去粘贴分享', 1.5)
  }

  render() {
    return (
      <>
        {this.isApp && (
          <div className={styles.share_box} onClick={this.handleAppShare}>
            <Icon type={require('svg/share.svg')} className={styles.btn_share} />分享
          </div>
        )}
        {this.isWechat && (
          <div className={styles.share_box} onClick={this.handleWechatShare}>
            <Icon type={require('svg/share.svg')} className={styles.btn_share} />分享
          </div>
        )}
        {this.isAlipay && (
          <div className={styles.share_box} onClick={this.handleAlipayShare}>
            <Icon type={require('svg/share.svg')} className={styles.btn_share} />分享
          </div>
        )}
        {!this.isApp &&
          !this.isWechat &&
          !this.isAlipay && (
            <Copy text={this.state.url} onCopied={this.onClickCopy}>
              <div className={styles.share_box}>
                <Icon type={require('svg/share.svg')} className={styles.btn_share} />
                分享
              </div>
            </Copy>
          )}
      </>
    )
  }
}

export default withSource<Props>(Share)
