import { Button } from 'components'
import { AssetImage } from 'constant/uikit'
import Router from 'next/router'
import React from 'react'
import styles from './Apply.less'
export interface ApplyProps {
  contract_no: string
  TYPE: 1 | 5
}

export interface ApplyState {}
const ApplyData = {
  1: {
    title: '暂无发票',
    content: (
      <p className={styles.apply_text}>
        暂未申请发票,申请后将以您的<span>实际支付金额</span>开具电子发票
      </p>
    ),
    disable: false,
  },
  5: {
    title: '很遗憾',
    content: <p className={styles.apply_text}>2018年1月1日之前创建的订单暂时无法在线申请发票，如有需要请联系客服</p>,
    disable: true,
  },
}
class Apply extends React.Component<ApplyProps, ApplyState> {
  toLink = async () => {
    await Router.push({
      pathname: '/myaccount/receipt/form',
      query: {
        contract_no: this.props.contract_no,
      },
    })
  }
  render() {
    const data = ApplyData[this.props.TYPE]
    return (
      <div className={styles.apply}>
        <img className={styles.img} src={AssetImage.MyAccount.Receipt.Apply} alt="发票" />
        <h2>{data.title}</h2>
        {data.content}
        <Button type="primary" className={styles.btn} disabled={data.disable} onClick={this.toLink}>
          开具电子发票
        </Button>
        {!data.disable && (
          <p className={styles.kefu}>
            如需纸质发票，请<a href="tel:400-670-0188">联系客服</a>
          </p>
        )}
      </div>
    )
  }
}

export default Apply
