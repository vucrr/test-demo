import wx from 'weixin-js-sdk'
import { axios } from 'utils/index'

function getWechatSigniture(shareUrl = window.location.href) {
  axios.post('/node-api/common/jsapi/checkToken', { url: shareUrl.split('#')[0] }).then(({ data }) => {
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。//debug最后要改为true
      appId: data.app_id, // 必填，公众号的唯一标识
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonce_str, // 必填，生成签名的随机串
      signature: data.signature, // 必填，签名，见附录1
      jsApiList: [
        'updateTimelineShareData',
        'updateAppMessageShareData',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
      ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
}

function share(params) {
  console.log(params)
  let { title, link, desc, imgUrl } = params
  if (!link) link = window.location.href
  // 获取签名信息
  getWechatSigniture()

  wx.ready(() => {
    // “分享到朋友圈”及“分享到QQ空间”
    wx.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        // 设置成功
      },
    })

    // “分享给朋友”及“分享到QQ”
    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        // 设置成功
      },
    })

    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      success() {},
      cancel() {},
    })

    // 分享到朋友圈（即将废弃）
    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {},
    })

    // “分享给朋友”（即将废弃）
    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success() {},
    })
  })
}

export { share, wx }
