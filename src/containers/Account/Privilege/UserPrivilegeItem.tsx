import { Toast } from 'antd-mobile'
import { Copy } from 'components'
import Router from 'next/router'
import React from 'react'
import { Dispatch } from 'redux'
import styles from './UserPrivilegeItem.less'

export enum PrivilegeTypes {
  Exchangeable = 1,
  Exchanged,
  Invalid,
  Unable,
  Delay, // 签收商品7天后方可领取使用
}

const convertTime = (time: string) => time.substring(0, 10).replace(/-/g, '.')

const goProductList = async () => {
  await Router.push('/product/category')
}

const StatusButton = (type: number) => {
  switch (type) {
    case PrivilegeTypes.Exchangeable:
      return <span className={styles.button}>获取券码</span>
    case PrivilegeTypes.Exchanged:
      return <span className={styles.disabledButton}>已获取</span>
    case PrivilegeTypes.Invalid:
      return <span className={styles.disabledButton}>已失效</span>
    default:
      return <span className={styles.disabledButton}>暂无法领取</span>
  }
}

const StatusBottom = (item: any, onClickCopy: (text: string) => void) => {
  if (item.get('type') === PrivilegeTypes.Delay || item.get('type') === PrivilegeTypes.Unable) {
    return (
      <section className={styles.plainWrapper}>
        <span>签收商品7天后方可领取使用</span>
      </section>
    )
  }
  if (item.get('type') === PrivilegeTypes.Invalid) {
    return (
      <section className={styles.plainWrapper} onClick={goProductList}>
        <span>您暂时无法享受此权益，再次下单即可激活哦！</span>
        <span className={styles.btn}>去下单</span>
      </section>
    )
  }
  if (item.get('redeem_code') && item.get('type') === PrivilegeTypes.Exchanged) {
    return (
      <Copy text={item.get('redeem_code')} onCopied={onClickCopy}>
        <section className={styles.exchangeWrapper}>
          <span className={styles.codeText}>兑换码 {item.get('redeem_code')}</span>
          <span className={styles.copyText}>复制并使用</span>
        </section>
      </Copy>
    )
  }
  return (
    <section className={styles.plainWrapper}>
      <span>
        领取有效期：{convertTime(item.get('started_at'))} - {convertTime(item.get('expired_at'))}
      </span>
    </section>
  )
}

interface UserPrivilegeItemProps {
  item: any
  onExchange: Dispatch
  onClickCopy: (text: string) => void
}

class UserPrivilegeItem extends React.Component<UserPrivilegeItemProps> {
  readonly state = {
    clicked: false,
  }

  exchange = async () => {
    if (this.state.clicked) return
    const { item, onExchange } = this.props
    if (item.get('type') === PrivilegeTypes.Exchangeable) {
      const error = await onExchange(item.get('user_priv_id'))
      if (error) Toast.info(error, 3)
    }
    this.setState({
      clicked: false,
    })
  }

  render() {
    const { item, onClickCopy } = this.props
    return (
      <div className={styles.item}>
        <section className={styles.topWrapper} onClick={this.exchange}>
          <h3>{item.get('title')}</h3>
          <div className={styles.wrapper}>
            <p className={styles.description}>{item.get('desc')}</p>
            {StatusButton(item.get('type'))}
          </div>
        </section>
        <section className={styles.tape}>
          {Array.from({ length: 20 }, (_, i) => i).map(v => <div className={styles.tapeDot} key={v} />)}
        </section>
        {StatusBottom(item, onClickCopy)}
      </div>
    )
  }
}

export default UserPrivilegeItem
