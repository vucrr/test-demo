import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Content.less'

const Item = Flex.Item

const StoreItems = [
  <div key="1">
    门店还机流程：
    <Flex justify="around" className={styles.process}>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.One} alt="" />
        申请还机
      </Flex>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.Two} alt="" />
        到达门店
      </Flex>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.Three} alt="" />
        质检机器
      </Flex>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.Four} alt="" />
        还机成功
      </Flex>
    </Flex>
  </div>,
  <span key="2">
    请务必关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的享换机信用等级。操作方法：
    <br />·
    苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。
    <br />· 其他用户请根据自身机型进行操作。
  </span>,
  '请携带归还者的身份证。',
  '请事先备份数据或携带U盘以方便储存。',
  '机器充满电，方便快速质检。',
  <span key="3">
    门店营业时间： <br /> 工作日：10: 00 - 22: 00 节假日：10: 00 - 21: 00
  </span>,
  <span key="4">
    如有疑问，请咨询享换机客服<a href="tel:400-6700188">400-6700188</a>。{' '}
  </span>,
]

const ExpressItems = [
  <div key="1">
    上门取件还机流程：
    <Flex justify="around" className={styles.process}>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.One} alt="" />
        邮寄机器
      </Flex>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.Two} alt="" />
        质检机器
      </Flex>
      <Flex direction="column">
        <img src={AssetImage.MyTrade.Exchange.Three} alt="" />
        还机成功
      </Flex>
    </Flex>
  </div>,
  <span key="2">
    请务必关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的享换机信用等级。操作方法：
    <br />·
    苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。
    <br />· 其他用户请根据自身机型进行操作。
  </span>,
  '请事先自行备份和删除数据。',
  '选择预约上门取件还机，不需要您付快递费；选择自行快递寄回，请自付快递费。',
  '自行邮寄时为确保货物安全，建议使用顺丰快递，寄件人手机号务必为下单时填写的手机号，若有更换请联系客服说明情况。',
  <span key="3">
    关于还机结果：
    <br />1）若质检通过，则还机成功，将短信通知您还机结果，使用花呗支付的用户，1-3个工作日内释放押金额度；使用信用卡支付的用户，7个工作日内释放押金额度。
    <br />2）若质检未通过，客服将联系您告知具体原因，届时将扣除您的押金，若购买时有减免押金，则需您补齐差价，扣除后机器归您所有。
  </span>,
  '在租赁期间有官方换机记录的用户，在还机前联系客服提供换机证明，否则将会影响您正常还机。',
  <span key="4">
    如有疑问，请咨询享换机客服<a href="tel:400-6700188">400-6700188</a>。{' '}
  </span>,
]

const Content = ({ isStore, isQsy }: { isStore: boolean; isQsy: boolean }) => {
  const list = isStore ? StoreItems : ExpressItems
  return (
    <div className={styles.list}>
      {list.map((text, index) => (
        <Flex className={styles.item} key={index} align="start">
          <span className={styles.icon}>{index + 1}</span>
          <Item className={classnames(styles.text, !isQsy && styles.xhjphone)}>{text}</Item>
        </Flex>
      ))}
    </div>
  )
}

export default Content
