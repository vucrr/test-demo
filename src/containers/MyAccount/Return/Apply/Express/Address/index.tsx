import * as expressAction from 'actions/myAccount/return/apply/express'
import { Modal, Toast } from 'antd-mobile'
import { Container, Header, TabBar, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { delayHandle } from 'utils/tools'
import { expressTypeList } from '../Index/index'
import Form from './Form'

const containerProps = {
  renderHeader: <Header>填写取件信息</Header>,
  renderTabBar: <TabBar hidden={true} />,
  bgColor: '#fff',
}

interface AddressProps extends withLoadingProps {
  expressInfo: any
  query: {
    returnflow_trade_no: string
    form: any
  }
  onExpress: any
}

class Address extends React.Component<AddressProps> {
  state = {
    mapAddressInfo: {
      province: '',
      county: '',
      address: '',
      detail_address: '',
      longitude: '',
      lat: '',
    },
    userForm: false,
    userId: '',
  }
  componentDidMount() {
    // 获取地址经纬度
    // encodeURIComponent
    const userId: any = Cookies.get('user_id_v2')
    let mapAddressInfo: any
    let userForm: any = this.state.userForm

    const mapAddressInfoCookie: any = Cookies.get('mapAddress_' + userId)
    if (mapAddressInfoCookie && this.props.query.form) {
      mapAddressInfo = JSON.parse(unescape(mapAddressInfoCookie))
      if (mapAddressInfo.city === '') {
        mapAddressInfo.city = mapAddressInfo.province
      }
      const { area, ...reset } = mapAddressInfo
      mapAddressInfo = { ...reset, county: area } // 更换 area 字段
    } else {
      const res = this.props.expressInfo.get('expressAddress')
      mapAddressInfo = {
        province: res.getIn(['address', 'province']),
        city: res.getIn(['address', 'city']) || res.getIn(['address', 'province']),
        county: res.getIn(['address', 'county']),
        longitude: res.getIn(['address', 'longitude']),
        lat: res.getIn(['address', 'lat']),
        detail_address: res.getIn(['address', 'detail_address']),
        address: res.getIn(['address', 'address']),
      }
      Cookies.set('mapAddress_' + userId, unescape(JSON.stringify(mapAddressInfo)), { expires: 100 })
    }
    // 保存用户写入但没有上传的代码
    const userFormCookie = Cookies.get('userForm_' + userId)
    if (this.props.query.form && userFormCookie) {
      userForm = JSON.parse(unescape(userFormCookie))
    }

    this.setState({
      mapAddressInfo,
      userForm,
      userId,
    })
  }

  handleRouter = async () => {
    await Router.push({
      pathname: '/myaccount/return/apply/express',
      query: {
        returnflow_trade_no: this.props.query.returnflow_trade_no,
      },
    })
  }

  onSubmit = async (value: any) => {
    value.phone = value.phone.replace(/\s+/g, '')
    const { onExpress, setLoading } = this.props
    const { mapAddressInfo } = this.state
    setLoading(true)
    const data = await onExpress.isAddressAvailable({
      ...mapAddressInfo,
      address: mapAddressInfo.address + mapAddressInfo.detail_address,
    }) // 拼接地址
    if (data.is_valid) {
      const addressInfo = {
        address: { ...this.state.mapAddressInfo },
        user: { ...value },
      }
      await onExpress.changeExpressAddress(addressInfo)
      Toast.info('保存成功', 2)
      await delayHandle(2)
      await this.handleRouter()
      setLoading(false)
    } else {
      setLoading(false)
      Modal.alert(
        '温馨提示',
        '该地址未覆盖顺丰服务，无法预约上门取件',
        [
          { text: '换个地址试试' },
          {
            text: '自行快递寄回',
            onPress: async () => {
              await this.props.onExpress.changeExpressType(expressTypeList.bySelf)
              await this.handleRouter()
            },
          },
        ],
        'android',
      )
    }
  }
  render() {
    return (
      <Container {...containerProps}>
        <Form
          data={this.props.expressInfo.get('expressAddress')}
          userForm={this.state.userForm}
          mapAddressInfo={this.state.mapAddressInfo}
          onSubmit={this.onSubmit}
        />
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
)(withLoading(Address))
