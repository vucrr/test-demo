import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './Sheet.less'

const priceMap = {
  return_service_price: '提前还机服务费',
  unpaid_plan_amount: '未付租金',
  due_fee: '逾期费',
}

const Desp: any = (props: { res: any }) => {
  const components: any[] = []
  Object.entries(priceMap).map((kv, i) => {
    if (props.res.get(kv[0])) {
      components.push(
        <h4 key={i}>
          {kv[1]}
          <span>￥{props.res.get(kv[0])}</span>
        </h4>,
      )
    }
  })
  return components
}

const Sheet = (res: any) => {
  return (
    <div className={classnames(styles.sheet, res.show && styles.show)}>
      <div className={styles.pop_machine}>
        <Icon type={require('svg/close.svg')} className={styles.pop_close} onClick={() => res.showPop(false)} />
        <h2>费用明细</h2>
        <div className={styles.cost_detail}>
          <h3>支付金额包含以下费用：</h3>
          <Desp res={res.date} />
          <p>费用将会优先使用您的账户余额、已冻结押金部分抵扣</p>
        </div>
      </div>
    </div>
  )
}

export default Sheet
