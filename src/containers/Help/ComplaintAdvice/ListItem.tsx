import { Flex } from 'antd-mobile'
import { LazyImage } from 'components'
import React, { useEffect } from 'react'
import LoadScript from 'utils/loadScript'
import styles from './ListItem.less'

const ListItem = () => {
  useEffect(function() {
    const script = new LoadScript('//dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9593', 'nTalk')
    void script.load()
  }, [])

  const handleClick = () => {
    NTKF.im_openInPageChat()
  }

  return (
    <div className={styles.CustomerService}>
      <Flex onClick={handleClick} align="center" justify="start" className={styles.custimerList}>
        <LazyImage className={styles.onlineImg} src={require('images/help/ComplaintAdvice/online.png')} />
        <div className={styles.textBox}>
          <p>在线咨询</p>
          <p>7*24小时为您服务</p>
        </div>
      </Flex>
      <Flex
        onClick={() => {
          location.href = 'tel:400-670-0188'
        }}
        align="center"
        justify="start"
        className={styles.custimerList}
      >
        <LazyImage className={styles.onlineImg} src={require('images/help/ComplaintAdvice/customerPhone.png')} />
        <div className={styles.textBox}>
          <p>客服热线</p>
          <p>服务时间 9:00-21:00</p>
        </div>
      </Flex>
      <Flex
        onClick={() => {
          location.href = 'mailto:110@xianghuanji.com'
        }}
        align="center"
        justify="start"
        className={styles.custimerList}
      >
        <LazyImage className={styles.onlineImg} src={require('images/help/ComplaintAdvice/suggest.png')} />
        <div className={styles.textBox}>
          <p>投诉建议</p>
          <p>110@xianghuanji.com</p>
        </div>
      </Flex>
    </div>
  )
}

export default ListItem
