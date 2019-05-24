import { Modal } from 'antd-mobile'
import React from 'react'
import styles from './index.less'

export default function openExpressAddressModal() {
  const content = (
    <div className={styles.dialogContent}>
      <span>请确保享换机在到期后7日内收到您的设备</span>
      <p>
        收件人：享换机 <br />联系方式：13310155193 <br />地址：上海市宝山区纪蕰路588号智力产业园2号楼1楼 享换机
      </p>
    </div>
  )
  Modal.alert('邮寄地址', content, [{ text: '我知道了' }], 'android')
}
