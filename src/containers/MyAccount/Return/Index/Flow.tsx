import classnames from 'classnames'
import React from 'react'
import styles from './Flow.less'
import { ReturnVia } from './index'

interface FlowProps {
  via: string
  isDetail: boolean
}

function Item(props: { item: string; index: number; via: string }) {
  const isLast = props.via === ReturnVia.Store ? props.index === 3 : props.index === 2
  const cx = classnames(styles.item, isLast && styles.hideIndicator)
  return (
    <div className={cx}>
      <div>{props.index + 1}</div>
      <span>{props.item}</span>
    </div>
  )
}

function Flow(props: FlowProps) {
  const items =
    props.via === ReturnVia.Store
      ? ['提交申请', '到达门店', '质检通过', '还机成功']
      : ['邮寄机器', '质检机器', '还机成功']
  return (
    <div className={classnames(styles.container, props.isDetail && styles.margin)}>
      {items.map((item: string, index: number) => <Item key={index} index={index} item={item} via={props.via} />)}
    </div>
  )
}

export default Flow
