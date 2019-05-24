import { Flex } from 'antd-mobile'
import { Button, CSButtons, Icon } from 'components'
import { ReturnVia } from 'containers/MyAccount/Return/Index'
import Router from 'next/router'
import React from 'react'
import styles from './Empty.less'

interface EmptyProps {
  tradeNo: string
  isQsy: boolean
}

class Empty extends React.Component<EmptyProps> {
  forward = async () => {
    if (this.props.isQsy) {
      await Router.push({
        pathname: '/myaccount/return',
        query: {
          trade_no: this.props.tradeNo,
          via: ReturnVia.Express,
        },
      })
    } else {
      await Router.push({
        pathname: '/myaccount/return/apply/express',
        query: {
          returnflow_trade_no: this.props.tradeNo,
        },
      })
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <Flex className={styles.top} direction="column" align="center" justify="center">
          <Icon type={require('svg/warning-gray.svg')} className={styles.icon} />
          <p>
            该城市暂时没有门店 <br />
            您可选择邮寄还机
          </p>
          <Button className={styles.button} type="primary" onClick={this.forward}>
            去邮寄还机
          </Button>
        </Flex>
        <div className={styles.cs_box}>
          <CSButtons />
        </div>
      </div>
    )
  }
}

export default Empty
