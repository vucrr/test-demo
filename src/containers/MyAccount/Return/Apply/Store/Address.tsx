import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './Address.less'

export interface Props {
  storeInfo: any
  query: any
  isDetailPage: boolean
}

export interface State {
  show: boolean
}

class Address extends React.Component<Props, State> {
  state = {
    show: false,
  }

  handleClick = async () => {
    await Router.push({
      pathname: '/myaccount/return/citylist',
      query: {
        trade_no: this.props.query.returnflow_trade_no,
        redirect: encodeURIComponent(
          `${window.location.pathname}?returnflow_trade_no=${this.props.query.returnflow_trade_no}`,
        ),
      },
    })
  }

  goStoreList = async () => {
    const { query, storeInfo, isDetailPage } = this.props
    if (isDetailPage) {
      return
    }
    await Router.push({
      pathname: '/myaccount/return/storelist',
      query: {
        store_id: query.store_id,
        region_id: query.region_id,
        city_name: query.city_name,
        city_id: storeInfo.city_id,
        trade_no: this.props.query.returnflow_trade_no,
        redirect: encodeURIComponent(`${window.location.pathname}?returnflow_trade_no=${query.returnflow_trade_no}`),
      },
    })
  }

  goMap = async () => {
    await Router.push({ pathname: '/myaccount/return/storemap', query: { store_id: this.props.storeInfo.store_id } })
  }

  openPanel = () => {
    const $body = document.querySelector('body')
    $body!.style.overflow = 'hidden'
    this.setState({ show: true })
  }

  call = () => {
    location.href = 'tel:' + this.props.storeInfo.phone
  }

  cancel = () => {
    const $body = document.querySelector('body')
    $body!.style.overflow = 'auto'
    this.setState({ show: false })
  }

  render() {
    const { storeInfo } = this.props
    return (
      <div className={styles.storeBox}>
        {!storeInfo && (
          <div className={styles.contentBox} onClick={this.handleClick}>
            <Icon type={require('svg/location.svg')} className={styles.icon_location} />
            <div className={styles.store}>请选择门店地址</div>
            <Icon type={require('svg/arrow-right.svg')} className={styles.icon_arrow} />
          </div>
        )}
        {storeInfo && (
          <>
            <div className={classnames(styles.contentBox, styles.bottomLine)} onClick={this.goStoreList}>
              <Icon type={require('svg/location.svg')} className={styles.icon_location} />
              <div className={styles.store}>
                {storeInfo.store_name}
                <p className={styles.detail}>{storeInfo.address}</p>
              </div>
              <Icon type={require('svg/arrow-right.svg')} className={styles.icon_arrow} />
            </div>
            <div className={styles.contactBox}>
              <div onClick={this.goMap} className={styles.item}>
                <Icon type={require('svg/map.svg')} className={styles.icon_map} />查看地图
              </div>
              <div className={styles.item} onClick={this.openPanel}>
                <Icon type={require('svg/phone.svg')} className={styles.icon_phone} />
                联系门店
              </div>
            </div>
          </>
        )}
        {this.state.show && (
          <div className={styles.mask}>
            <div className={styles.callPanel}>
              <Flex direction="column" className={styles.info}>
                <div>工作日：10:00-22:00 节假日：10:00-21:00</div>
                <div onClick={this.call}>{storeInfo.phone}</div>
              </Flex>
              <Button onClick={this.cancel}>取消</Button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default Address
