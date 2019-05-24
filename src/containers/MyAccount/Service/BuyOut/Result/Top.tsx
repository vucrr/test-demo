import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Top.less'

const Top = ({ status, contractNo }: { status: number; tradeNo?: string; contractNo: string }) => {
  const LinkTo = async (url: string, origin = false) => {
    if (origin) {
      location.href = url
    }
    await Router.push(url)
  }

  if (status === 0) {
    return (
      <div className={styles.top_box}>
        <Flex justify="center" className={classnames(styles.icon_box, styles.fail)}>
          <Icon className={styles.icon} type={require('svg/warning.svg')} />
        </Flex>
        <h3>受理中 请稍后查看</h3>
        <p>若您有疑问，请联系享换机客服</p>
        <a className={styles.tel} href="tel:400-6700-188">
          400-6700-188
        </a>
      </div>
    )
  }

  if (status === 1) {
    return (
      <div className={styles.top_box}>
        <Flex justify="center" className={classnames(styles.icon_box, styles.success)}>
          <Icon className={styles.icon} type={require('svg/right.svg')} />
        </Flex>
        <h3>支付成功</h3>
        <p>恭喜您，手机已经是您的私有财产了哦</p>
        <div className={styles.button_box}>
          <Button
            className={classnames(styles.button, styles.width)}
            onClick={() => LinkTo(`/myaccount/service/detail?contract_no=${contractNo}`)}
          >
            查看订单
          </Button>
          <Button className={classnames(styles.button, styles.width)} onClick={() => LinkTo('/')}>
            返回首页
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.top_box}>
      <Flex justify="center" className={classnames(styles.icon_box, styles.fail)}>
        <Icon className={styles.icon} type={require('svg/warning.svg')} />
      </Flex>
      <h3>支付失败</h3>
      <p>离自己拥有只差一步</p>
      <div className={styles.button_box}>
        <Button className={styles.button} onClick={() => LinkTo(`/myaccount/service/detail?contract_no=${contractNo}`)}>
          查看订单
        </Button>
        <Button className={styles.button} type="primary" onClick={() => Router.back()}>
          重新支付
        </Button>
      </div>
    </div>
  )
}

export default Top
