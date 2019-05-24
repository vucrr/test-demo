import { Button } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Content.less'

const Content = (props: any) => {
  const forward = async () => {
    await Router.push({
      pathname: '/myaccount/return',
      query: Router.router!.query,
    })
  }

  return (
    <>
      <div className={styles.top_box}>
        <p className={styles.title}>未还租金</p>
        <p className={styles.price}>¥{props.price.get('unpaid_plan_amount')}</p>
        <p>由于您还有租金未还，还机成功后还需支付此笔费用</p>
      </div>
      <div className={styles.button_box}>
        <Button className={styles.button} type="primary" onClick={forward}>
          同意并继续
        </Button>
      </div>
      <div className={styles.bottom_box}>
        如有疑问请联系享换机客服{' '}
        <a href="tel:400-670-0188" className={styles.tel}>
          400-670-0188
        </a>
      </div>
    </>
  )
}

export default Content
