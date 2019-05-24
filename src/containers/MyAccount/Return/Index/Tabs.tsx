import Router from 'next/router'
import React from 'react'
import styles from './Tabs.less'
import { ReturnVia } from './index'

interface TabsProps {
  via: string
}

const onTap = (via: string) => async () => {
  await Router.push({ pathname: '/myaccount/return', query: { ...Router.router!.query, via } })
  window.scrollTo(0, 0)
}

function Tabs(props: TabsProps) {
  return (
    <div className={styles.container}>
      <div onClick={onTap(ReturnVia.Store)}>
        <span className={props.via === ReturnVia.Store ? styles.active : null}>门店还机</span>
      </div>
      <div onClick={onTap(ReturnVia.Express)}>
        <span className={props.via === ReturnVia.Express ? styles.active : null}>邮寄还机</span>
      </div>
    </div>
  )
}

export default Tabs
