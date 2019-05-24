import { Flex } from 'antd-mobile'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './Present.less'

// const Item = Flex.Item

const PresentOne = ({ isCmblife }: { isCmblife: boolean }) => {
  const date = [
    {
      icon: AssetImage.Activity.Guidance.Present1,
      title: '0押金租机',
      content: isCmblife ? '押金仅需冻结信用卡预授权，无需额外支付现金' : '芝麻信用600分及以上有机会享受0押金租机',
    },
    {
      icon: AssetImage.Activity.Guidance.Present2,
      title: '月付租金低',
      content: isCmblife ? '远低于同类分期平台，负担压力小' : '远低于信用卡和分期平台，负担压力小',
    },
    {
      icon: AssetImage.Activity.Guidance.Present3,
      title: '意外维修服务',
      content: '碎屏、功能损坏等免费寄送维修无需自费',
    },
    {
      icon: AssetImage.Activity.Guidance.Present4,
      title: '到期选择多',
      content: isCmblife
        ? '可以买断、还机或者再租个新机，每年用最新款手机'
        : '可以续租、买断、还机或者再租个新机每年用最新款手机',
    },
  ]
  return (
    <div>
      <div className={styles.presentOne}>
        <p className={styles.title}>信用租机领潮者</p>
        <h2 className={styles.tit2}>享换机是国内领先的用机服务提供者，为用户提供按使用付费的电子产品消费新模式。</h2>
        {!isCmblife && (
          <ul>
            <li>
              <img src={AssetImage.Activity.Guidance.Present5} className={styles.huabei} />
              <h3>蚂蚁花呗战略合作伙伴</h3>
            </li>
            <li>
              <img src={AssetImage.Activity.Guidance.Present6} className={styles.zhima} />
              <h3>芝麻信用首批商户</h3>
            </li>
          </ul>
        )}
        <div className={styles.parted}>
          {Array.from({ length: 20 }, (_, i) => i).map(v => <div className={styles.tapeDot} key={v} />)}
        </div>
        {date.map((item, index) => {
          return (
            <div className={styles.safety} key={index}>
              <img className={styles.safe_icon} src={item && item.icon} />
              <div className={styles.grid_text}>
                <h4>{item && item.title}</h4>
                <h5>{item && item.content}</h5>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
const PresentTwo = ({ isCmblife }: { isCmblife: boolean }) => {
  return (
    <div>
      <div className={styles.presentTwo}>
        <p className={styles.title}>租机能省多少钱？</p>
        <h3 className={styles.tit2}>
          {isCmblife ? '在享换机租机和在其他分期平台对比' : '在享换机租机和在某信用卡平台分期对比'}
        </h3>
        <img src={AssetImage.Activity.Guidance.Present2_1} />
      </div>
    </div>
  )
}

const PresentThree = ({ isCmblife }: { isCmblife: boolean }) => {
  // isCmblife ? '' :
  const date = [
    {
      icon: AssetImage.Activity.Guidance.Present3_1,
      title: '.挑选机型',
      content: isCmblife ? '多种不同机型可供选择' : '可选择不同机型，租期6、12个月可选',
    },
    {
      icon: AssetImage.Activity.Guidance.Present3_2,
      title: isCmblife ? '.信用卡预授权额度' : '.信用评估',
      content: isCmblife
        ? '招行信用卡直接冻结租金+押金额度，每月自动转为信用卡账单'
        : '芝麻分600以上有机会享受0押金租机',
    },
    {
      icon: AssetImage.Activity.Guidance.Present3_3,
      title: '.快递配送',
      content: '顺丰快递，全程包邮，速度快又安心',
    },
    {
      icon: AssetImage.Activity.Guidance.Present3_4,
      title: '.月付租金',
      content: isCmblife ? '无需手动还款，信用卡每月自动生成账单' : '无需手动还款，支付宝每月自动扣款',
    },
  ]
  return (
    <div>
      <div className={styles.presentThree}>
        <p className={styles.title}>如何租机？</p>
        <div className={styles.parted}>
          {Array.from({ length: 25 }, (_, i) => i).map(v => <div className={styles.tapeDot} key={v} />)}
        </div>
        {date.map((item, index) => {
          return (
            <div className={styles.safety} key={index}>
              <img className={styles.safe_icon} src={item && item.icon} />
              <div className={styles.grid_text}>
                <h4>
                  <span>{index + 1}</span>
                  {item && item.title}
                </h4>
                <h5>{item && item.content}</h5>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
const PresentFour = ({ isCmblife }: { isCmblife: boolean }) => {
  let date = [
    {
      icon: AssetImage.Activity.Guidance.Present4_1,
      title: '归还换新',
      content: '支持门店或者邮寄归还(换新用户送7天租期)',
    },
    {
      icon: AssetImage.Activity.Guidance.Present4_2,
      title: '继续租用',
      content: '续租期间可随时买断或还机(续租满指定期限，机器自动买断)',
    },
    {
      icon: AssetImage.Activity.Guidance.Present4_3,
      title: '买断机器',
      content: '支付尾款，终身拥有',
    },
  ]
  if (isCmblife) {
    date = [
      {
        icon: AssetImage.Activity.Guidance.Present4_1,
        title: '归还换新',
        content: '支持门店或者邮寄归还(换新用户送7天租期)',
      },
      {
        icon: AssetImage.Activity.Guidance.Present4_3,
        title: '买断机器',
        content: '支付尾款，终身拥有',
      },
    ]
  }
  return (
    <div>
      <div className={styles.presentFour}>
        <p className={styles.title}>到期怎么做？</p>
        {date.map((item, index) => {
          return (
            <div className={styles.safety} key={index}>
              <img className={styles.safe_icon} src={item && item.icon} />
              <div className={styles.grid_text}>
                <h4>{item && item.title}</h4>
                <h5>{item && item.content}</h5>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
const PresentFive = () => {
  const date = [
    {
      icon: AssetImage.Activity.Guidance.Present5_1,
      title: '意外维修服务',
      content: '碎屏、功能性损坏等问题均可免费维修',
    },
    {
      icon: AssetImage.Activity.Guidance.Present5_2,
      title: 'FutureDial隐私擦除服务',
      content: '用户归还的手机将立刻清除信息并提供清除认证',
    },
    {
      icon: AssetImage.Activity.Guidance.Present5_3,
      title: '免费享隐私险',
      content: '手机信息未彻底清除导致泄露并造成经济损失，可获得最高100,000元赔偿',
    },
  ]
  return (
    <div>
      <div className={styles.presentFive}>
        <p className={styles.title}>增值服务</p>
        <p className={styles.tit2}>在享换机租机成功的用户均可享受</p>
        {date.map((item, index) => {
          return (
            <Flex className={styles.safety} key={index} align="start">
              <img className={styles.safe_icon} src={item && item.icon} />
              <div className={styles.grid_text}>
                <h4>{item && item.title}</h4>
                <h5>{item && item.content}</h5>
              </div>
            </Flex>
          )
        })}
      </div>
    </div>
  )
}
const Present = ({ utm }: any) => {
  const isCmblife = utm.get('isCmblife')
  return (
    <div id={styles.Present}>
      <PresentOne isCmblife={isCmblife} />
      <PresentTwo isCmblife={isCmblife} />
      <PresentThree isCmblife={isCmblife} />
      <PresentFour isCmblife={isCmblife} />
      <PresentFive />
    </div>
  )
}
export default Present
