import { GetInitialPropsContext } from '@@types/next'
import * as centerActions from 'actions/account/center'
import { checkLogin, redirectTo } from 'actions/app'
import { Container, Header, TabBar, Wrap } from 'components'
import { SourceProps } from 'components/withSource'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { cleanUserInfo } from 'utils/tools'
import NavBox from './NavBox'
import RecommendList from './RecommendList'
import ServiceBox from './ServiceBox'
import TopBox from './TopBox'

export interface CenterProps extends ErrorObject {
  info: any
}

export interface CenterState {}

class Center extends React.Component<CenterProps & SourceProps, CenterState> {
  static async getInitialProps({ store, isServer, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath, req }))
    if (isLogin) {
      const data = await store.dispatch(centerActions.fetchInfo({ req }))
      if (data.status) {
        return { error: data }
      }
      if (data.user && !data.user.bind_mobile) {
        // 支付宝新用户，需要绑定手机号
        const path = '/myaccount/bind/change-phone?redirect_url=%2Faccount%2Fcenter'
        await redirectTo({ isServer, res, path })
      }
    }
  }

  componentDidMount() {
    const { error } = this.props
    if (error && error.code === 501) {
      cleanUserInfo()
    }
  }

  render() {
    const { error, utm, info } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const containerProps = {
      renderHeader: <Header hidden={true}>个人中心</Header>,
      renderTabBar: <TabBar selectedTab="myCenter" />,
      fixedTabBar: true,
    }

    const topBoxProps = {
      mobile: info.getIn(['user', 'mobile']),
      thumb: info.getIn(['user', 'head_portrait']),
    }

    const navBoxProps = {
      balance: info.getIn(['balance_ticket', 'balance']),
      coupon: info.getIn(['balance_ticket', 'coupon']),
    }

    const serviceBoxProps = {
      showTitle: info.getIn(['service', 'is_available_history']),
      list: info.getIn(['service', 'contracts']).toJS() || [],
    }

    const showRecommendList = !utm.get('isCmblife') && !utm.get('isDxsh')

    return (
      <Container {...containerProps}>
        <TopBox {...topBoxProps}>
          <ServiceBox {...serviceBoxProps} />
        </TopBox>
        <Wrap bgColor="#fff">
          <NavBox {...navBoxProps} />
          {showRecommendList && <RecommendList list={info.getIn(['recommend', 'list']).toJS() || []} />}
        </Wrap>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  info: state.getIn(['account', 'center', 'newInfo']),
  utm: state.getIn(['serverApp', 'utm']),
})

export default connect(mapStateToProps)(Center)
