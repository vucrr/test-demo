import { GetInitialPropsContext } from '@@types/next'
import { checkLogin, redirectTo } from 'actions/app'
import { getRepairCategory } from 'actions/myAccount/repair/category'
import { Flex, Modal } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import { RepairCategory } from 'interfaces/repair'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import styles from './index.less'

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>维修申报</Header>,
  renderTabBar: <TabBar hidden={true} />,
  className: styles.container,
}

interface RepairProps extends ErrorObject {
  query: {
    trade_no: string
  }
  url: {
    asPath: string
  }
  data: RepairCategory
}

class Repair extends React.Component<RepairProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.trade_no) {
        const data = await store.dispatch(getRepairCategory(query.trade_no, req))
        if (data.has_repair) {
          const path = `/myaccount/repair/quality-detail?sn=${data.repair_no}`
          await redirectTo({ isServer, res, path })
        } else {
          return { data }
        }
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }

  forward = () => {
    // 带上 redirect 跳老的发票页面
    const tradeNo = this.props.query.trade_no
    const asPath = this.props.url.asPath
    window.location.href = `/account/applyinvoice?trade_no=${tradeNo}&redirect=${encodeURIComponent(asPath)}`
  }

  handleClick = async () => {
    const { data, query } = this.props
    // TODO: 发票判断 @saber - 2019-01-03 - 14:42
    if (!data.has_repair) {
      await Router.push({ pathname: '/myaccount/repair/form', query: { ...query, type: data.type } })
      return
    }
    Modal.alert(
      '维修提示',
      '您的设备维修需提供电子发票，请先开具电子发票哦。',
      [{ text: '取消' }, { text: '申请发票', onPress: this.forward }],
      'android',
    )
  }

  handleAccident = async () => {
    const { data, query } = this.props
    if (data.is_insure) {
      await Router.push({ pathname: '/myaccount/repair/form', query: { ...query, type: data.type } })
    }
  }

  render() {
    const { error, data } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    if (!data) {
      return null
    }
    return (
      <Container {...containerProps}>
        <h1>您的设备遇到什么问题？</h1>
        <Flex direction="column">
          <Flex direction="column" className={styles.wrapper} onClick={this.handleAccident}>
            <h2>意外损坏</h2>
            <p>如碎屏、进水、设备变形等</p>
            {!data.is_insure && <div className={styles.mask}>该订单不享受此项服务</div>}
          </Flex>
          <Flex direction="column" className={styles.wrapper} onClick={this.handleClick}>
            <h2>质量问题</h2>
            <p>如蓝牙、屏幕无显示、触摸失灵、话筒不响等</p>
            {!data.is_insure && data.is_second && <div className={styles.mask}>该订单不享受此项服务</div>}
          </Flex>
        </Flex>
      </Container>
    )
  }
}

export default connect()(Repair)
