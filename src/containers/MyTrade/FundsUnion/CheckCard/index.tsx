import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as fundsUnionActions from 'actions/myTrade/fundsUnion'
import { CreateStrategyPayParams } from 'actions/myTrade/order/pay'
import { Modal } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import Error from 'containers/Error'
import Router from 'next/router'
import qs from 'querystring'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import FirstForm from './FirstForm'
import SecondForm from './SecondForm'

const alert = Modal.alert

interface CheckCardProps {
  url: {
    query: {
      formStatus: '1' | '2'
      bindCard: boolean & CreateStrategyPayParams
    }
  }
  onFundsUnionActions: any
  billNo: any
  cardInfo: any
  error?: any
  ua: any
}

const CheckCard: NextSFC2<CheckCardProps & any> = ({
  error,
  url: { query },
  onFundsUnionActions,
  billNo,
  cardInfo,
  ua,
}) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps: any = {
    rightContentType: 'tabBar',
  }

  if (query.formStatus === '1') {
    headerProps.onLeftClick = () => {
      trackClickEvent({ category: TrackEventFundsUnion.Frame.Name, label: TrackEventFundsUnion.Frame.Item2 })
      alert(
        '',
        '你还未完成资料补充，确定要退出吗？',
        [
          {
            text: '取消',
            style: 'default',
            onPress: () =>
              trackClickEvent({ category: TrackEventFundsUnion.Cancel.Name, label: TrackEventFundsUnion.Cancel.Item1 }),
          },
          {
            text: '确定',
            onPress: () => {
              trackClickEvent({
                category: TrackEventFundsUnion.Confirm.Name,
                label: TrackEventFundsUnion.Confirm.Item2,
              })
              Router.back()
            },
          },
        ],
        'android',
      )
    }
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>{query.formStatus === '1' ? '验证银行卡信息' : '验证手机号'}</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const formProps = {
    billNo,
    onFundsUnionActions,
    step: query.formStatus,
    cardInfo,
  }

  return (
    <Container {...containerProps}>
      <FirstForm {...formProps} query={query} />
      <SecondForm {...formProps} query={query} ua={ua} />
    </Container>
  )
}

CheckCard.getInitialProps = async ({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    if (query.formStatus === '1') {
      if (!query.bindCard) {
        const hasCard = await store.dispatch(fundsUnionActions.fetchCardList({ req }))
        if (hasCard.length > 0) {
          const { formStatus, ...reset } = query
          const goUrl = `/mytrade/funds-union/cards?${qs.stringify(reset)}`
          if (isServer) {
            res.redirect(goUrl)
            res.end()
            return {}
          } else {
            await Router.replace(goUrl)
          }
        } else {
          const data = await store.dispatch(fundsUnionActions.fetchForm({ req }))
          if (data.status > 200) return { error: data }
        }
      } else {
        const data = await store.dispatch(fundsUnionActions.fetchForm({ req }))
        if (data.status > 200) return { error: data }
      }
    }
  }
}

const mapStateToProps = (state: any) => ({
  billNo: state.getIn(['myTrade', 'fundsUnion', 'checkCard', 'billNo']),
  cardInfo: state.getIn(['myTrade', 'fundsUnion', 'checkCard', 'form']),
  ua: state.getIn(['serverApp', 'ua']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onFundsUnionActions: bindActionCreators(fundsUnionActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckCard)
