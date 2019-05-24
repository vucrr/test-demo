import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Top.less'

const Top = ({ success = true }: any) => {
  const LinkTo = async (url: string) => {
    await Router.push(url)
  }

  return (
    <>
      {success && (
        <div className={styles.top_box}>
          <Flex justify="center" className={classnames(styles.icon_box, styles.success)}>
            <Icon className={styles.icon} type={require('svg/right.svg')} />
          </Flex>
          <h3>恭喜你 还机成功</h3>
          <p>您已还机成功，花呗预授权将在1-3个工作日进行释放，请注意查看。</p>
        </div>
      )}
      {!success && (
        <div className={styles.top_box}>
          <Flex justify="center" className={classnames(styles.icon_box, styles.fail)}>
            <Icon className={styles.icon} type={require('svg/warning.svg')} />
          </Flex>
          <h3>受理中 请稍后查看</h3>
          <p>
            若您有疑问，请联系享换机客服 <br />
            <span className={styles.tel}>400-6700-188</span>
          </p>
        </div>
      )}
      <div className={styles.button_box}>
        <Button className={styles.button} onClick={() => LinkTo('/')}>
          回到首页
        </Button>
        <Button className={styles.button} type="primary" onClick={() => LinkTo('/')}>
          去租新机
        </Button>
      </div>
    </>
  )
}

export default Top
