import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as fundsUnionActions from 'actions/myTrade/fundsUnion'
import { Modal } from 'antd-mobile'
import { Container, Header, Link, TabBar } from 'components'
import { TrackEventFundsUnion } from 'configs/trackEventLabels'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import qs from 'querystring'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import Item from './Item'
import styles from './List.less'

const alert = Modal.alert

interface CardsProps extends ErrorObject {
  list: any
  onFundsUnionActions: any
  url: {
    query: any
  }
}

const Cards: NextSFC2<CardsProps> = ({ error, list, onFundsUnionActions, url }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps: any = {
    rightContentType: 'tabBar',
    onLeftClick: () => {
      trackClickEvent({ category: TrackEventFundsUnion.Frame.Name, label: TrackEventFundsUnion.Frame.Item1 })
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
    },
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>选择银行卡</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <div className={styles.title}>请选择银行卡，增加信用担保</div>
      <Item list={list} onFundsUnionActions={onFundsUnionActions} query={url.query} />
      <Link
        className={styles.othersBox}
        to={`/mytrade/funds-union/check-card?formStatus=1&bindCard=true&${qs.stringify(url.query)}`}
        trackEvent={{ category: TrackEventFundsUnion.AddCard.Name, label: TrackEventFundsUnion.AddCard.Item }}
      >
        使用其他银行卡验证 >
      </Link>
    </Container>
  )
}

Cards.getInitialProps = async ({ store, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(fundsUnionActions.fetchCardList({ req }))
    if (data.status > 200) return { error: data }
  }
}

const mapStateToProps = (state: any) => ({
  list: state.getIn(['myTrade', 'fundsUnion', 'cards', 'list']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onFundsUnionActions: bindActionCreators(fundsUnionActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cards)
