import { exchangeWithId, fetchUserPrivilegeList } from 'actions/account/privilege'
import { checkLogin, redirectLogin } from 'actions/app'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import { AssetImage } from 'constant/uikit'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { Dispatch, bindActionCreators } from 'redux'
import UserPrivilegeItem from './UserPrivilegeItem'
import styles from './index.less'

const JIEDIAN_LANDING = 'https://ymobile-cn.ankerjiedian.com/coupons'
const ALIPAY_LANDING = 'https://qr.alipay.com/s6x0081771jvuqqsejv2jde'

interface PrivilegeProps extends ErrorObject {
  list: any
  isWechat: boolean
  isAlipay: boolean
  isApp: boolean

  onExchange(index: number): Dispatch
}

class Privilege extends React.Component<PrivilegeProps, { open: boolean; isToJiedianLanding: boolean }> {
  static getInitialProps = async ({ query, store, res, isServer, asPath, req }: any) => {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.id && query.type) {
        const data = await store.dispatch(fetchUserPrivilegeList(query, req))
        if (data.status) {
          if (data.status === 401) {
            await redirectLogin({ isServer, res, asPath })
          }
          return { error: data }
        }
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }

  readonly state = {
    open: false,
    isToJiedianLanding: this.props.isAlipay || this.props.isWechat || this.props.isApp,
  }

  onClickCopy = () => {
    Toast.info('复制成功，马上去兑换', 1, () => {
      location.href = this.state.isToJiedianLanding ? JIEDIAN_LANDING : ALIPAY_LANDING
    })
  }

  render() {
    const { error, list, onExchange } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>街电抵用券</Header>,
      renderTabBar: <TabBar selectedTab="myCenter" hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        <img className={styles.topImage} src={AssetImage.Account.UserPrivilegeTop} alt="" />
        <div className={styles.listWrapper}>
          {list.map((item: any, index: number) => (
            <UserPrivilegeItem key={index} item={item} onExchange={onExchange(index)} onClickCopy={this.onClickCopy} />
          ))}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  list: state.getIn(['account', 'privilege', 'userList']),
  isWechat: state.getIn(['serverApp', 'ua', 'isWechat']),
  isAlipay: state.getIn(['serverApp', 'ua', 'isAlipay']),
  isApp: state.getIn(['serverApp', 'ua', 'isApp']),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onExchange: (index: number) => bindActionCreators(exchangeWithId(index), dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Privilege as any)
