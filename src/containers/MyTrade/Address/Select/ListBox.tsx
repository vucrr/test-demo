import { Flex, List } from 'antd-mobile'
import { Icon } from 'components'
// import Cookies from 'js-cookie'

import React from 'react'
import styles from './ListBox.less'

const Item = List.Item

export interface ListBoxProps {
  pois: any
  count: any
  keyword: string
  onhandleCityDetail: Function
  handleClick: Function
}
interface ListBoxState {}
class ListBox extends React.Component<ListBoxProps, ListBoxState> {
  saveAddress = async (items: any) => {
    const item = items.toJS()
    const { location } = item
    const mapAddressInfo = {
      province: '',
      city: '',
      area: '',
      longitude: location.lng,
      lat: location.lat,
      detail_address: item.name,
      address: item.address,
    }
    const value = await this.props.onhandleCityDetail('', [location.lng, location.lat], false)
    mapAddressInfo.province = value.regeocode.addressComponent.province
    mapAddressInfo.city = value.regeocode.addressComponent.city
    mapAddressInfo.area = value.regeocode.addressComponent.district
    this.props.handleClick(mapAddressInfo)
  }

  renderKeysItem = (originText: any) => {
    const { keyword } = this.props
    return originText.replace(keyword, `<span class="keywords">${keyword}</span>`)
  }

  render() {
    if (this.props.count !== -1) {
      return (
        <List className={styles.list}>
          {this.props.pois.map((item: any, index: any) => {
            return (
              <Item className={styles.item} key={index} onClick={() => this.saveAddress(item)}>
                <p
                  className={styles.text}
                  dangerouslySetInnerHTML={{ __html: this.renderKeysItem(item.get('name')) }}
                />
                <p
                  className={styles.text_gray}
                  dangerouslySetInnerHTML={{ __html: this.renderKeysItem(item.get('address')) }}
                />
              </Item>
            )
          })}
        </List>
      )
    }

    return (
      <Flex className={styles.nodata} direction="column">
        <Icon className={styles.icon} type={require('svg/nodata.svg')} />
        <p className={styles.text}>未搜索到该地址，换个地址试试</p>
      </Flex>
    )
  }
}

export default ListBox
