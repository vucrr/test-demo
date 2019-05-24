import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as expressAction from 'actions/myAccount/return/apply/express'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import HeadTab from '../../HeadTab'
import OrderInfo from '../../OrderInfo'
import Tips from '../../Tips'
import Btn from './Btn'
import ExpressType from './ExpressType'
import styles from './ExpressType.less'
import Result from './Result'

export enum expressTypeList {
  bySelf = 1, // 自寄
  byOrder = 2, // 上门取件
}

interface ExpressProps extends ErrorObject {
  expressInfo: any
  onExpress: any
  query: {
    returnflow_trade_no?: string // 订单
    sub_trade_no?: string // 还机单
  }
  orderType: number // 订单类型 1、商品订单 2、换机订单
}

class Express extends React.Component<ExpressProps> {
  static getInitialProps = async ({ query, store, isServer, res, asPath, req }: GetInitialPropsContext) => {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(expressAction.fetchDetail(query, req))
      if (data && data.errorMsg) {
        return { error: data }
      } else {
        return { orderType: data.trade_type }
      }
    }
  }
  componentWillMount() {
    if (this.props.error) {
      return
    }
    const {
      query: { sub_trade_no },
      expressInfo,
    } = this.props
    const isDetailPage = Boolean(sub_trade_no) // 还机详情参数
    const hasExpressType = expressInfo.get('expressType') // 初次进入页面为''
    // 初始页面获取邮寄方式
    if (!hasExpressType && !isDetailPage) {
      const expressTypeList = expressInfo.getIn(['detail', 'express_type_list'])
      if (expressTypeList) {
        const expressType = expressTypeList.find((type: any) => !!type.get('is_select')).get('code') // 邮寄方式
        this.props.onExpress.changeExpressType(expressType)
      }
    }
  }

  render() {
    const { error, expressInfo, onExpress, query, orderType } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const isDetailPage = Boolean(query.sub_trade_no) // 是否详情页
    const expressType = isDetailPage ? expressInfo.getIn(['detail', 'express_type']) : expressInfo.get('expressType') // 1是自寄 2是上门取件
    const containerProps = {
      renderHeader: <Header>{isDetailPage ? '邮寄还机详情' : orderType === 1 ? '还机申请' : '完善还机信息'}</Header>,
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    const infoProps = {
      expressInfo,
      onExpress,
      expressType,
    }
    const HeadTabProps = {
      showTab: !isDetailPage && orderType === 1,
      data: expressInfo.get('detail'),
      query,
    }
    const ResultBtnProps = {
      ...infoProps,
      query,
      orderType,
      // 重新申请  邮递员拒绝
      returnflow_trade_no: expressInfo.getIn(['detail', 'trade_no']),
    }
    const ExpressTypeProps = {
      ...infoProps,
      isDetailPage,
      query,
    }
    return (
      <Container {...containerProps} className={styles.container}>
        <HeadTab {...HeadTabProps} />
        {isDetailPage && <Result {...ResultBtnProps} />}
        <ExpressType {...ExpressTypeProps} />
        {!isDetailPage && <Btn {...ResultBtnProps} />}
        <OrderInfo data={expressInfo.get('detail')} />
        <Tips via="express" />
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  expressInfo: state.getIn(['myAccount', 'returnApply', 'express']),
})

const mapDispatch = (dispatch: any) => ({
  onExpress: bindActionCreators(expressAction, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatch,
)(Express)
