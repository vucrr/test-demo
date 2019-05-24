import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Footer.less'

const utmMap = ['isChangyou', 'isAhs', 'isSichuanYiDong', 'isCmblife']

const datas = {
  inside: {
    to: '/product/category',
    native: false,
    img: AssetImage.Activity.Guidance.Footer,
  },
  without: {
    to: '/site/appdownload',
    native: true,
    img: AssetImage.Activity.Guidance.Footerxz,
  },
}

const Footer = (res: any) => {
  const app = res.ua.get('isApp') ? 'isApp' : res.ua.get('isAlipay')
  const chId = utmMap.filter(item => res.utm.get(item))
  const ditch = app ? 'app' : chId
  const data = ditch.length !== 0 ? datas.inside : datas.without

  const linkDit = (to: any, native: boolean) => {
    !native
      ? (location.href = to)
      : (location.href = !res.ua.get('isWechat')
          ? 'airent://www.xianghuanji.com/homePage?page=category'
          : res.ua.get('isIOS')
            ? 'https://itunes.apple.com/cn/app/xiang-huan-ji-nian-nian-huan/id1180882205?mt=8'
            : 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aihuishou.airent')
    setTimeout(() => {
      location.href = to
    }, 2000)
  }
  return (
    <div id={styles.footer}>
      <p>
        若有任何疑问，请联系客服<a href="tel:400-670-0188">400-670-0188</a>
      </p>
      <a className={styles.button} onClick={() => linkDit(data.to, data.native)}>
        <img src={data.img} />
      </a>
    </div>
  )
}
export default Footer
