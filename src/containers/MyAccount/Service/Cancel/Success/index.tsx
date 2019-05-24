import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as cancelActions from 'actions/myAccount/service/cancel'
import { Container, Header, TabBar } from 'components'
import { AssetImage } from 'constant/uikit'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { noop } from 'utils/tools'
import ProductBox from '../Index/ProductBox'
import styles from './index.less'

export interface CancelSuccessQuery {
  trade_no: string
  old_trade_no?: string
  type: string
}

interface ServiceCancelProps {
  query: CancelSuccessQuery
  info: any
}

const ServiceCancelSuccess: NextSFC2<ServiceCancelProps & ErrorObject> = ({ error, info }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps = {
    icon: null,
    onLeftClick: noop,
    rightContent: <span onClick={async () => Router.back()}>完成</span>,
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>取消服务详情</Header>,
    renderTabBar: <TabBar hidden={true} />,
    bgColor: '#fff',
  }

  const productBoxProps = {
    type: info.get('contract_type'),
    oldSku: info.get('old_sku_info'),
    sku: info.get('sku_info'),
  }

  return (
    <Container {...containerProps}>
      <img className={styles.titleImg} src={AssetImage.ReturnFlow.Detail.returnSuccess} alt="logo" />
      <h1 className={styles.title}>已取消服务</h1>
      <sub className={styles.subtitle}>{info.get('result_text')}</sub>
      <div className={styles.wrapper}>
        <ProductBox {...productBoxProps} />
        <div className={styles.detail}>
          <p>取消原因：{info.get('cancel_reason')}</p>
          <p>取消说明：{info.get('reason_dec')}</p>
          {/* 取消类型  1.未支付取消  2.已支付取消 */}
          {info.get('cancel_type') === 2 && <p>释放金额：￥{info.get('release_price')}</p>}
          <p>取消时间：{info.get('cancel_date')}</p>
        </div>
      </div>
    </Container>
  )
}

ServiceCancelSuccess.getInitialProps = async ({ store, query, isServer, res, asPath, req }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(
      cancelActions.fetchResultInfo(
        { trade_no: query.trade_no, old_trade_no: query.old_trade_no, type: query.type },
        req,
      ),
    )
    if (data.status) {
      return { error: data }
    }
  }
}

const mapStateToProps = (state: any) => ({
  info: state.getIn(['myAccount', 'service', 'cancel', 'result']),
})

export default connect(mapStateToProps)(ServiceCancelSuccess)
