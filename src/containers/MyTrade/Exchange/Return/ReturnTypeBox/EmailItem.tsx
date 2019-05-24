import { Flex, Toast } from 'antd-mobile'
import { Copy } from 'components'
import React from 'react'
import styles from './EmailItem.less'

export interface EmailItemProps {}

const EmailItem: React.FunctionComponent<EmailItemProps> = () => {
  const onClickCopy = () => {
    Toast.info('复制成功', 1.5)
  }
  return (
    <div className={styles.content}>
      <div className={styles.title}>
        <label>邮寄地址</label>
        <span>下单完成后可在服务详情再次查看</span>
      </div>
      <Flex className={styles.item} align="start">
        <p className={styles.itemTitle}>寄</p>
        <Flex.Item className={styles.itemDetail}>
          新机签收后，归还旧机可选择<b>预约上门取件</b>或<b>自行快递寄回</b>
        </Flex.Item>
      </Flex>
      <Flex className={styles.item} align="start">
        <p className={styles.itemTitle}>收</p>
        <Flex.Item className={styles.itemDetail}>
          收件人：享换机 13310155193 <br />
          地址：上海市宝山区纪蕴路588号智力产业园2号楼1楼
          <Copy
            onCopied={onClickCopy}
            text="上海市宝山区纪蕰路588号智力产业园2号楼1楼 收件人：享换机 手机号：13310155193"
          >
            <span className={styles.copy}>复制</span>
          </Copy>
        </Flex.Item>
      </Flex>
    </div>
  )
}

export default EmailItem
