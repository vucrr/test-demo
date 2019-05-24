import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchAddressForm, saveAddressForm } from 'actions/myTrade/address'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tools } from 'utils'
import StoreInfo from './StoreInfo'
import UserInfo from './UserInfo'

class Form extends React.Component<
  { data: any; error: any; url: { query: any }; onSaveAddressForm: Function },
  { mapAddressInfo: object; userForm: any }
> {
  readonly state = {
    mapAddressInfo: {},
    userForm: false,
  }
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      if (query.refer) {
        await store.dispatch(
          fetchAddressForm({
            query: { store_code: (req && req.cookies.store_code) || Cookies.get('store_code') },
            isServer,
            req,
          }),
        )
      } else {
        return { error: { status: 500, errorMsg: '路由参数不合法' } }
      }
    }
  }

  componentDidMount() {
    // 把url set cookies
    if (this.props.url.query.refer) {
      Cookies.set('trade_refer', this.props.url.query.refer, { expires: 100 })
    }
    // 获取地址经纬度
    // encodeURIComponent
    const userId: any = Cookies.get('user_id_v2')
    let mapAddressInfo: any
    let userForm: any = this.state.userForm

    const mapAddressInfoCookie = Cookies.get('mapAddress_' + userId)
    if (mapAddressInfoCookie && this.props.url.query.form) {
      mapAddressInfo = JSON.parse(unescape(mapAddressInfoCookie))
    } else {
      const res = this.props.data
      mapAddressInfo = {
        province: res.getIn(['userDeliveryInfo', 'province']),
        city: res.getIn(['userDeliveryInfo', 'city']) || res.getIn(['userDeliveryInfo', 'province']),
        area: res.getIn(['userDeliveryInfo', 'area']),
        longitude: res.getIn(['userDeliveryInfo', 'longitude']),
        lat: res.getIn(['userDeliveryInfo', 'lat']),
        detail_address: res.getIn(['userDeliveryInfo', 'detail_address']),
        address: res.getIn(['userDeliveryInfo', 'address']),
      }
      Cookies.set('mapAddress_' + userId, unescape(JSON.stringify(mapAddressInfo)), { expires: 100 })
    }
    // 保存用户写入但没有上传的代码
    const userFormCookie = Cookies.get('userForm_' + userId)
    if (this.props.url.query.form && userFormCookie) {
      userForm = JSON.parse(unescape(userFormCookie))
    }

    this.setState({
      mapAddressInfo,
      userForm,
    })
  }
  handleClick = async (query: any) => {
    query.phone = query.phone.replace(/\s+/g, '')
    try {
      const { data } = await this.props.onSaveAddressForm({
        query: { ...query, store_code: Cookies.get('store_code') },
      })
      if (data.isSuccess) {
        const userId: any = Cookies.get('user_id_v2')
        Cookies.remove('userForm_' + userId)
        const refer: any = Cookies.get('trade_refer')
        await Router.push(refer)
      } else {
        Toast.info(data.errorMsg)
      }
    } catch (err) {
      tools.ErrorLog(err)
    }
  }
  render() {
    const { data, error } = this.props
    const type = this.props.data.getIn(['userDeliveryInfo', 'delivery_type']) || 1
    if (data.get('errorMsg')) {
      return <Error statusCode={data.get('status')} errorMsg={data.get('errorMsg')} />
    } else if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}> 填写收货人信息 </Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        {type === 1 ? (
          <UserInfo data={data} {...this.state} handleClick={this.handleClick} />
        ) : (
          <StoreInfo data={data} handleClick={this.handleClick} />
        )}
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  data: state.getIn(['myTrade', 'address', 'form']),
})
const mapDispatchToProps = (dispatch: any) => ({
  onSaveAddressForm: bindActionCreators(saveAddressForm, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form)
