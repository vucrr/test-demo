import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './StoreItem.less'

const Item = Flex.Item

export interface EmptyProps {
  onClick: Function
}

const Empty: React.FunctionComponent<EmptyProps> = ({ onClick }) => {
  return (
    <Flex className={styles.item} align="center" onClick={() => onClick()}>
      <Item className={styles.flex}>
        <Icon className={styles.icon} type={require('svg/location.svg')} color="#FF5544" />
        <p>请选择门店地址</p>
      </Item>
      <Icon type="right" color="#ccc" />
    </Flex>
  )
}
interface ContactProps {
  contactStore: Function
  store: any
}
const Contact: React.FunctionComponent<ContactProps> = ({ contactStore, store }) => {
  const href = 'tel:' + store.phone
  return (
    <div className={styles.pop}>
      <div className={styles.contact}>
        <p className={styles.time}>工作日：10:00-22:00 节假日：10:00-21:00</p>
        <p>
          <a href={href}>{store.phone}</a>
        </p>
        <p className={styles.close} onClick={() => contactStore(false)}>
          取消
        </p>
      </div>
    </div>
  )
}
export interface StoreItemProps {
  store: any
  trade_no: string
}

class StoreItem extends React.Component<StoreItemProps> {
  readonly state = {
    contact: false,
  }
  render() {
    const { store, trade_no } = this.props
    const toLink = async () => {
      trackClickEvent({
        category: TrackEventExchange.ReturnWayChoose.category,
        label: TrackEventExchange.ReturnWayChoose.name5,
      })
      const query = {
        trade_no: trade_no,
        city_id: store.city_id,
        region_id: store.region_id,
        store_id: store.store_id,
        exchange: true,
        city_name: encodeURIComponent(store.city),
      }
      if (store.store_id) {
        await Router.push({ pathname: '/myaccount/return/storelist', query })
      } else {
        await Router.push({ pathname: '/myaccount/return/citylist', query })
      }
    }
    const toMAP = async () => {
      await Router.push('/myaccount/return/storemap?store_id=' + store.store_id)
    }

    const contactStore = (res: boolean) => {
      this.setState({
        contact: res,
      })
    }
    return (
      <div className={styles.store_item_box}>
        {!store.store_id && <Empty onClick={toLink} />}
        {store.store_id && (
          <>
            <Flex className={styles.item} onClick={toLink}>
              <Item className={styles.flex}>
                <Icon className={styles.icon} type={require('svg/location.svg')} color="#FF5544" />
                <p>
                  {store.store_name}
                  <br />
                  <span className={styles.gray_text}>{store.address}</span>
                </p>
              </Item>
              <Icon type="right" color="#ccc" />
            </Flex>
            <Flex className={classnames(styles.item, styles.split)}>
              <Item className={styles.flex_center} onClick={toMAP}>
                <Icon type={require('svg/map.svg')} color="#666" /> <span>查看地图</span>
              </Item>
              <Item className={styles.flex_center} onClick={() => contactStore(true)}>
                <Icon type={require('svg/phone.svg')} color="#666" /> <span>联系门店</span>
              </Item>
            </Flex>
          </>
        )}
        {this.state.contact && <Contact contactStore={contactStore} store={store} />}
      </div>
    )
  }
}

export default StoreItem
