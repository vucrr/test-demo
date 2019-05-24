import { Toast } from 'antd-mobile'
import { Copy, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import React from 'react'

interface Props {
  url: string
}

interface State {}

class Share extends React.Component<Props & SourceProps, State> {
  shareInfoApp = {
    url: this.props.url,
    title: '享换机电子发票',
    content: '打开链接即可获取发票pdf文件',
    img: '//mstaticc.xianghuanji.com/react/_next/static/images/logo-download-0b25ffcb7a740ff6e4eeb9e08786ad34.png',
  }

  isWechat = this.props.ua.get('isWechat')
  isAlipay = this.props.ua.get('isAlipay')
  isApp = this.props.ua.get('isApp')
  isAndroidApp = this.props.ua.get('isAndroidApp')
  isIOSApp = this.props.ua.get('isIOSApp')

  handleAppShare = () => {
    this.shareInfoApp.url = this.props.url
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
      link: this.props.url,
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
    return (
      <>
        {this.isApp && <span onClick={this.handleAppShare}>打印</span>}
        {this.isWechat && <span onClick={this.handleWechatShare}>打印</span>}
        {this.isAlipay && <span onClick={this.handleAlipayShare}>打印</span>}
        {!this.isApp &&
          !this.isWechat &&
          !this.isAlipay && (
            <Copy text={this.props.url} onCopied={this.onClickCopy}>
              <span>打印</span>
            </Copy>
          )}
      </>
    )
  }
}

export default withSource<Props>(Share)
