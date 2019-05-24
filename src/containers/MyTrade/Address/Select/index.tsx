import { changeSearch, handleCityDetail } from 'actions/myTrade/address/select'
import { Toast } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Geo from 'utils/geo'
import ListBox from './ListBox'
import SearchBar from './SearchBar'

export interface SelectProps {
  url: {
    query: {
      city: string
      redirect: string
    }
  }
  pois: any
  count: any
  msg: string
  onhandleCityDetail: Function
  onchangeSearch: Function
}

interface SelectState {
  cookieAddress: any
  city: any
  keyword: string
}

class Select extends React.Component<SelectProps, SelectState> {
  readonly state: SelectState = {
    cookieAddress: false,
    city: false,
    keyword: '',
  }
  async componentDidMount() {
    const userId: any = Cookies.get('user_id_v2')
    let mapAddressInfo: any
    const cookMap = Cookies.get('mapAddress_' + userId)
    const { city } = this.props.url.query
    if (cookMap) {
      mapAddressInfo = JSON.parse(unescape(cookMap))
    }
    this.setState({
      cookieAddress: mapAddressInfo || false,
      city: city || false,
    })
    await this.loadSearch(city, mapAddressInfo)
  }
  loadSearch = async (city: any, mapAddressInfo: any) => {
    try {
      await Geo.load()
      const positionCity = await Geo.city
      if (city) {
        // 从城市列表页跳转过来
        await this.props.onchangeSearch('loading')
      } else if (mapAddressInfo) {
        // 用户之前保存过地址 根据lng lat获取展示列表
        const value = await this.props.onhandleCityDetail('', [mapAddressInfo.longitude, mapAddressInfo.lat], false)
        value &&
          value.regeocode &&
          this.setState({
            city: value.regeocode.addressComponent.city || value.regeocode.addressComponent.province,
          })
      } else {
        // 用当前定位 获取展示列表
        await this.props.onchangeSearch(positionCity, positionCity)
        this.changekeyword(positionCity)
        this.setState({
          city: positionCity,
        })
      }
    } catch (e) {
      Toast.info('报错了')
    }
  }

  changekeyword = (keyword: any) => {
    this.setState({ keyword })
  }

  handleClick = async (mapAddressInfo: any) => {
    const userId: any = Cookies.get('user_id_v2')
    const refer = Cookies.get('trade_refer')
    Cookies.set('mapAddress_' + userId, unescape(JSON.stringify(mapAddressInfo)), { expires: 100 })
    if (this.props.url.query.redirect) {
      await Router.push(this.props.url.query.redirect)
    } else {
      await Router.push({
        pathname: '/mytrade/address/form',
        query: {
          refer,
          form: true,
        },
      })
    }
  }
  render() {
    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>收货地址</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        <SearchBar
          city={this.state.city}
          {...this.props}
          count={this.props.count}
          handleClick={this.handleClick}
          changekeyword={this.changekeyword}
        />
        {this.props.count === 0 && <p>{this.props.msg}</p>}
        <ListBox {...this.state} {...this.props} handleClick={this.handleClick} />
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  pois: state.getIn(['myTrade', 'address', 'select', 'pois']),
  count: state.getIn(['myTrade', 'address', 'select', 'count']),
  msg: state.getIn(['myTrade', 'address', 'select', 'msg']),
})
const mapDispatchToProps = (dispatch: any) => ({
  onhandleCityDetail: bindActionCreators(handleCityDetail, dispatch),
  onchangeSearch: bindActionCreators(changeSearch, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Select)
