import { Accordion, Flex, List } from 'antd-mobile'
import React from 'react'
import styles from '../AccordionList.less'

const Panel = Accordion.Panel

const AccordionOne = ({ activeKey, onAccordionChange, utm }: Partial<AccordionProps>) => {
  const BrandText = utm.get('brand')
  const AccordionOneData = [
    {
      key: 1,
      title: '1.租机时间到了，怎么还机？',
      content: [
        '有两种还机方式，门店还机和邮寄还机。',
        '门店还机：1.在' +
          BrandText +
          'APP内选择门店后申请归还；2.去门店，质检人员现场检测机器状况，符合还机条件的即可成功还机。',
        '邮寄还机：1.在' +
          BrandText +
          'APP内选择邮件还机方式后申请归还；2.邮寄机器到指定门店；3.查询还机进度，符合还机条件的即可成功还机。',
      ],
    },
    {
      key: 2,
      title: '2.还机前需要做哪些准备？',
      content: [
        '还机前，需关闭设备锁屏密码，并退出设备账户ID。否则将导致还机失败并影响您的 ' +
          BrandText +
          '信用等级。操作方法：',
        '· 苹果用户前往“设置”>“触控ID与密码”>“关闭密码”，即可关闭锁屏密码；前往“设置”>轻点头像>“退出登录”，即可退出账户ID。',
        '· 其他用户请根据自身机型进行操作。',
      ],
    },
    {
      key: 3,
      title: '3.租机到期，忘记归还怎么办？',
      content: [
        '未开启自动续租用户：我们会在到期前7个自然日和1个自然日分别以短信的形式通知您，您需在到期后7个自然日内将机器归还给' +
          BrandText +
          '，如超过7个自然日仍未归还，则需您买下这个机器。',
        '已开启自动续租用户：若到期后7天您仍未做处理，将按照续租价格自动按月为您续租。',
      ],
    },
    {
      key: 4,
      title: '4.归还机器时配件需要归还吗？',
      content: [
        '需要一并归还哦，但是如果您的配件遗失了，也可以不用归还。归还配件有助于您提升在' +
          BrandText +
          '的信用分、后续享受更多的优惠。',
      ],
    },
    {
      key: 5,
      title: '5.还机后我的隐私如何保障？',
      content: [
        '1. 每位用户均享受隐私擦除服务，该服务由 FutureDial或爱回收提供，收到用户还机后将立即清除手机信息。',
        '2.每位用户均享有隐私险（由众安在线财产保险承保），还机后如信息未彻底清除导致用户信息泄露造成直接经济损失，可获得赔偿。',
      ],
    },
    {
      key: 6,
      title: '6.什么情况下机器不能正常归还？',
      content: [
        '机身进水，防潮标识变色；',
        '机身弯曲变形，幅度大于1毫米；',
        '屏幕碎裂，显示有色斑、漏液、错乱、严重老化、无法正常显示；',
        '私自拆修，手机背板、系统、卡槽IMEI号不一致；',
        '充电功能、无线功能、账号功能、指纹和按键功能、指南针功能、触摸功能不正常，无法正常使用的无法还机。',
      ],
    },
    {
      key: 7,
      title: '7.还机后什么时候释放剩余的冻结额度？',
      content: [
        '归还后2个工作日内会操作取消冻结额度，具体到账时间，花呗用户1-3个工作日内到账，信用卡用户7个工作日内到账。',
      ],
    },
    {
      key: 8,
      title: '8.我所在城市没有还机门店怎么办？',
      content: ['如果您当地没有爱回收的门店，可以申请邮寄还机，机器需要在到期后7天内寄到我司售后处，逾期则只能买断。'],
    },
  ]

  const isCmblife: any = {
    2: {
      key: 3,
      title: '3.租机到期，忘记归还怎么办？',
      content: [
        '我们会在到期前7个自然日和1个自然日分别以短信的形式通知您，您需在到期后7个自然日内将机器归还给享换机，如超过7个自然日仍未归还，则需您买下这个机器。',
      ],
    },
    6: {
      title: '',
    },
    7: {
      key: 7,
      title: '7.我所在城市没有还机门店怎么办？',
      content: ['如果您当地没有爱回收的门店，可以申请邮寄还机，机器需要在到期后7天内寄到我司售后处，逾期则只能买断。'],
    },
  }
  if (utm.get('isCmblife')) {
    const key = Object.keys(isCmblife)
    key.forEach((item: any) => {
      AccordionOneData[item] = isCmblife[item]
    })
  }
  return (
    <List className={styles.itemTitle} renderHeader="还机">
      <Accordion className={styles.itemBox} accordion={true} activeKey={activeKey} onChange={onAccordionChange}>
        {AccordionOneData.map(item => {
          if (item.title === '') {
            return ''
          }
          return (
            <Panel key={item.key} header={item.title} id={'question' + item.key}>
              <Flex wrap="wrap" className={styles.item_box}>
                {item.content.map((item2, index2) => {
                  return <p key={item.key + index2}>{item2}</p>
                })}
              </Flex>
            </Panel>
          )
        })}
      </Accordion>
    </List>
  )
}

export default AccordionOne
