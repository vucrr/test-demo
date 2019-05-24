import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import React, { MouseEvent } from 'react'
import styles from './Service.less'

class Service extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      const e = document.createElement('script')
      e.type = 'text/javascript'
      e.async = true
      e.src = '//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9593'
      const s = document.getElementsByTagName('script')[0]
      s.parentNode!.insertBefore(e, s)
    }, 0)
  }
  phoneClick() {
    location.href = 'tel:400-670-0188'
  }
  handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    NTKF.im_openInPageChat()
  }
  render() {
    return (
      <div className={styles.service}>
        <p className={styles.tishi}>如有疑问，请联系享换机客服，服务时间 9:00-21:00</p>
        <Flex justify="between">
          <div onClick={this.handleClick}>
            <Flex align="center" justify="center" className={styles.ser_btn}>
              <Icon type={require('svg/kefu.svg')} className={styles.icon} />在线客服
            </Flex>
          </div>
          <Flex align="center" justify="center" className={styles.ser_btn} onClick={this.phoneClick}>
            <Icon type={require('svg/phone.svg')} className={styles.icon} />电话客服
          </Flex>
        </Flex>
      </div>
    )
  }
}

export default Service
