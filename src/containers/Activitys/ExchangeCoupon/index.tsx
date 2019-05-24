import { GetInitialPropsContext } from '@@types/next'
import { fetchCouponInfo, fetchInfo } from 'actions/activitys/exchangeCoupon'
import { checkLogin } from 'actions/app'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Coupon from './Coupon'
import Foryou from './Foryou'
import Hot from './Hot'
import Rule from './Rule'
import Top from './Top'
import styles from './index.less'

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>换新机领优惠券</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

interface ExchangeCouponProps extends ErrorObject {
  exchangecoupon: any
  ua: any
  fetchCouponInfo: Function
  query: any
}
interface ExchangeCouponState {
  type: number
  readyClick: boolean
}
class ExchangeCoupon extends React.Component<ExchangeCouponProps, ExchangeCouponState> {
  state = {
    type: 1, // 是否领取 1未领 2已领
    readyClick: false, // false表示未点击 true表示已点击
  }
  static getInitialProps = async ({ store, query, req, isServer, res, asPath }: GetInitialPropsContext) => {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(fetchInfo({ query, req }))
      if (data.status) {
        return { error: data }
      }
    }
  }
  componentDidMount() {
    if (this.props.query.readyClick) {
      void this.couponclick()
    }
  }
  couponclick = async () => {
    const { readyClick } = this.state
    if (readyClick === false) {
      const data = await this.props.fetchCouponInfo({
        query: { coupon_rule_id: this.props.exchangecoupon.get('coupon_rule_id'), source: 'newUser' },
      })
      if (data.status === 1) {
        this.setState({ type: 2, readyClick: true })
        Toast.info(data.desc)
      } else if (data.status === 2) {
        this.setState({ type: 2, readyClick: true })
        Toast.info(data.desc)
      } else {
        Toast.info(data.desc)
      }
    }
  }

  render() {
    const { error, exchangecoupon, ua } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const { type, readyClick } = this.state
    return (
      <Container {...containerProps}>
        <div className={styles.content}>
          <Top title={exchangecoupon.get('brand_name')} />
          <Foryou list={exchangecoupon.get('recommand_product')} />
          {exchangecoupon.get('coupon_type') === 1 && (
            <Coupon
              title={exchangecoupon.get('discount_amount')}
              type={type}
              readyClick={readyClick}
              click={this.couponclick}
            />
          )}
          <Hot list={exchangecoupon.get('recommand_product_hot')} ua={ua} />
          <Rule />
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  exchangecoupon: state.getIn(['activitys', 'exchangeCoupon']),
  ua: state.getIn(['serverApp', 'ua']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchCouponInfo: bindActionCreators(fetchCouponInfo, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExchangeCoupon)
