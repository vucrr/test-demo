import { Flex } from 'antd-mobile'
import React from 'react'
import styles from './Content.less'

const Item = Flex.Item

const StoreItems = [
  <span key="1">
    请务必关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的享换机信用等级。操作方法如下：<br />
    1) 苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。<br />
    2) 其他用户请根据自身机型进行操作。
  </span>,
  '请携带归还者的身份证。',
  '请事先备份数据或携带U盘以方便储存。',
  '机器充满电，方便快速质检。',
  <span key="2">
    门店营业时间：<br />工作日：10:00-22:00 节假日：10:00-21:00
  </span>,
  <span key="3">
    如有疑问，请咨询享换机客服<a href="tel:400-6700188">400-6700188</a>。{' '}
  </span>,
]

const ExpressItems = [
  <span key="1">
    请务必关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的享换机信用等级。操作方法如下：<br />
    1) 苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。<br />
    2) 其他用户请根据自身机型进行操作。
  </span>,
  '请事先自行备份和删除数据。',
  '快递费用遵循“谁寄谁付”的原则，为确保货物安全，建议使用顺丰快递，还机日即快递签收日。寄件人手机号务必为下单时填写的手机号，若有更换请联系客服说明情况。',
  <span key="2">
    关于还机结果：<br />
    1）若质检通过，则还机成功，将短信通知您还机结果，使用花呗支付的用户，1-3个工作日内释放押金额度；使用信用卡支付的用户，7个工作日内释放押金额度。<br />
    2）若质检未通过，客服将联系您告知具体原因，届时将扣除您的押金，若购买时有减免押金，则需您补齐差价，扣除后机器归您所有。
  </span>,
  <span key="3">在租赁期间有官方换机记录的用户，在还机前联系客服提供换机证明，否则将会影响您正常还机。</span>,
  <span key="4">
    如有疑问，请咨询享换机客服 <a href="tel:400-6700188">400-6700188</a>。{' '}
  </span>,
]

const Smail = ({ isStore }: { isStore: boolean }) => {
  const list = isStore ? StoreItems : ExpressItems
  return (
    <div className={styles.list}>
      {list.map((text, index) => (
        <Flex className={styles.item} key={index} align="start">
          <span className={styles.icon}>{index + 1}</span>
          <Item className={styles.text}>{text}</Item>
        </Flex>
      ))}
    </div>
  )
}

export default Smail
