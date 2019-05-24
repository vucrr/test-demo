import { List } from 'antd-mobile'
import { Icon } from 'components'
import openExpressAddressModal from 'components/ExpressAddressModal'
import { fromJS } from 'immutable'
import Router from 'next/router'
import React from 'react'
import StoreItem from '../StoreList/StoreItem'
import styles from './Address.less'
import { ReturnVia } from './index'

const Item = List.Item

interface AddressProps {
  via: string
  tradeNo: string
  store: any
}

const Address = (props: AddressProps) => {
  async function forwardToStore() {
    await Router.push({
      pathname: '/myaccount/return/storelist',
      query: { ...Router.router!.query },
    })
  }

  async function forward() {
    await Router.push({ pathname: '/myaccount/return/citylist', query: { trade_no: props.tradeNo } })
  }

  if (props.via === ReturnVia.Store) {
    if (props.store && props.store.store_id) {
      return <StoreItem item={fromJS(props.store)} editable={false} canForward={true} onClick={forwardToStore} />
    }
    return (
      <div className={styles.containerStore}>
        <List>
          <Item
            onClick={forward}
            thumb={<Icon color="#5facfb" type={require('svg/location.svg')} />}
            multipleLine={true}
            arrow="horizontal"
          >
            请选择门店地址
          </Item>
        </List>
      </div>
    )
  }
  return (
    <div className={styles.container}>
      <List>
        <Item onClick={openExpressAddressModal} arrow="horizontal">
          邮寄地址
        </Item>
      </List>
    </div>
  )
}

export default Address
