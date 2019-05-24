import { Toast } from 'antd-mobile'
import React from 'react'
import Copy from '../Copy'
import withSource, { SourceProps } from '../withSource'

interface Props {
  url: string
  title?: string
  content?: string
  img: string
  children: any
  beforehand?: boolean
}

interface State {}

class Share extends React.Component<Props & SourceProps, State> {
  shareInfoApp = {
    url: this.props.url,
    title: this.props.title || '享换机',
    content: this.props.content || '666',
    img: this.props.img,
  }
  isWechat = this.props.ua.get('isWechat')
  isAlipay = this.props.ua.get('isAlipay')
  isApp = this.props.ua.get('isApp')
  isAndroidApp = this.props.ua.get('isAndroidApp')
  isIOSApp = this.props.ua.get('isIOSApp')

  componentDidMount() {
    if (!this.props.beforehand) {
      if (this.isWechat) {
        const { share } = require('utils/wechat')
        share({
          title: this.shareInfoApp.title,
          desc: this.shareInfoApp.content,
          imgUrl: this.shareInfoApp.img,
          link: this.shareInfoApp.url,
        })
      }
      if (this.isAlipay) {
        const { initShare } = require('utils/alipayShare')
        initShare({
          title: this.shareInfoApp.title,
          content: this.shareInfoApp.content,
          image: this.shareInfoApp.img,
          url: this.shareInfoApp.url,
        })
      }
    }
  }

  handleAppShare = () => {
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
    const { share } = require('utils/wechat')
    share({
      title: this.shareInfoApp.title,
      desc: this.shareInfoApp.content,
      imgUrl: this.shareInfoApp.img,
      link: this.shareInfoApp.url,
    })
    Toast.info('点击右上角分享给好友', 1.5)
  }

  handleAlipayShare = () => {
    const { alipayShare } = require('utils/alipayShare')
    alipayShare({
      title: this.shareInfoApp.title,
      content: this.shareInfoApp.content,
      image: this.shareInfoApp.img,
      url: this.props.url,
    })
  }

  onClickCopy = () => {
    Toast.info('复制成功，请去粘贴分享', 1.5)
  }

  render() {
    const { children } = this.props
    return (
      <>
        {this.isApp && <div onClick={this.handleAppShare}>{children}</div>}
        {this.isWechat && <div onClick={this.handleWechatShare}>{children}</div>}
        {this.isAlipay && <div onClick={this.handleAlipayShare}>{children}</div>}
        {!this.isApp &&
          !this.isWechat &&
          !this.isAlipay && (
            <Copy text={this.shareInfoApp.url} onCopied={this.onClickCopy}>
              {children}
            </Copy>
          )}
      </>
    )
  }
}

export default withSource<Props>(Share)
