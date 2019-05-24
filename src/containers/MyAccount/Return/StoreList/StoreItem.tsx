import { Flex } from 'antd-mobile'
import { Button, Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import styles from './StoreItem.less'

interface StoreItemProps {
  item: any
  editable?: boolean
  canForward?: boolean
  onClick?: Function
}

class StoreItem extends React.Component<StoreItemProps> {
  static defaultProps = {
    editable: true,
    canForward: false,
  }

  readonly state = {
    show: false,
  }

  onClick = () => {
    this.props.onClick && this.props.onClick(this.props.item)
  }

  goMap = (id: string) => async () => {
    await Router.push({ pathname: '/myaccount/return/storemap', query: { store_id: id } })
  }

  openPanel = () => {
    const $body = document.querySelector('body')
    $body!.style.overflow = 'hidden'
    this.setState({ show: true })
  }

  call = () => {
    location.href = 'tel:' + this.props.item.get('phone')
  }

  cancel = () => {
    const $body = document.querySelector('body')
    $body!.style.overflow = 'auto'
    this.setState({ show: false })
  }

  renderSelect = () => {
    if (!this.props.editable) {
      return (
        <div>
          <Icon color="#5facfb" type={require('svg/location.svg')} />
        </div>
      )
    }
    return this.props.item.get('selected') ? <div className={styles.selected} /> : <div className={styles.unselected} />
  }

  render() {
    const { item } = this.props
    return (
      <>
        <div className={styles.container}>
          <div className={styles.content} onClick={this.onClick}>
            {this.renderSelect()}
            <div className={styles.detail}>
              <p className={styles.title}>{item.get('store_name')}</p>
              <p className={styles.address}>{item.get('address')}</p>
            </div>
            {this.props.canForward && (
              <div>
                <Icon type="right" color="#B0B0B0" />
              </div>
            )}
          </div>
          <div className={styles.buttons}>
            <div className={styles.btn} onClick={this.goMap(item.get('store_id'))}>
              <Icon size="xxs" color="#666" type={require('svg/map.svg')} />
              <span>查看地图</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.btn} onClick={this.openPanel}>
              <Icon size="xxs" type={require('svg/phone.svg')} />
              <span>联系门店</span>
            </div>
          </div>
        </div>
        {this.state.show && (
          <div className={styles.mask}>
            <div className={styles.callPanel}>
              <Flex direction="column" className={styles.info}>
                <div>工作日：10:00-22:00 节假日：10:00-21:00</div>
                <div onClick={this.call}>{item.get('phone')}</div>
              </Flex>
              <Button onClick={this.cancel}>取消</Button>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default StoreItem
