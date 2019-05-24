import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Immutable from 'immutable'
import { List } from 'antd-mobile'
import { Icon } from 'components'
import styles from './AddressList.less'

const Item = List.Item
const Brief = Item.Brief

const onClick = async () => {
  await Router.push({
    pathname: '/account/getDeliveryAddress',
    query: {
      refer: encodeURIComponent(window.location.href),
    },
  })
}

const Empty = () => (
  <div className={styles.empty_box}>
    <List>
      <Item arrow="horizontal" onClick={onClick}>
        <span className={styles.label}>新建收货人信息</span>
      </Item>
    </List>
  </div>
)

const AddressList = ({ item }) => {
  const itemProps = {
    multipleLine: true,
    extra: <Icon className={styles.icon_edit} type="icon-edit" />,
    onClick,
  }
  const hasList = !!item.count()

  return (
    <div className={styles.address_box}>
      {!hasList && <Empty />}
      {hasList && (
        <List>
          <Item {...itemProps}>
            <span className={styles.name}>
              {item.get('contact')} {item.get('phone')}
            </span>
            <Brief>
              {item.get('province')}
              {item.get('city')}
              {item.get('area')}
              {item.get('address')}
              {item.get('detail_address')}
              {item.get('house_number')}
            </Brief>
          </Item>
        </List>
      )}
    </div>
  )
}

AddressList.propTypes = {
  item: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default AddressList
