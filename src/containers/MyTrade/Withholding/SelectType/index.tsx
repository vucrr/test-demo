import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as withholdingActions from 'actions/myTrade/withholding/selectType'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorReturn } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SelectTypeHeader from './Header'
import SelectTypeList from './List'

interface SelectTypeProps {
  list: any
  listWithholds?: Function
  error?: ErrorReturn
  onWithholdingActions: any
}

const SelectType: NextSFC2<SelectTypeProps> = ({ error, list, onWithholdingActions }) => {
  const headerProps = {
    rightContentType: 'tabBar',
  }
  const containerProps = {
    renderHeader: <Header {...headerProps}>绑定还款方式</Header>,
    renderTabBar: <TabBar hidden={true} />,
    bgColor: 'white',
  }

  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }
  return (
    <Container {...containerProps}>
      <SelectTypeHeader />
      <SelectTypeList list={list} onWithholdingActions={onWithholdingActions} />
    </Container>
  )
}

SelectType.getInitialProps = async ({ store, req, isServer, res, asPath, query }: any) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (!isLogin) return
  if (!query.trade_no) return { error: { status: 500, errorMsg: '路由参数不合法' } }
  const data = await store.dispatch(withholdingActions.listWithholds(req, query.trade_no))
  if (data.errorMsg) return { error: data }
}

const mapStateToProps = (state: any) => ({
  list: state.getIn(['myTrade', 'withholding', 'selectType', 'list']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onWithholdingActions: bindActionCreators(withholdingActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectType)
