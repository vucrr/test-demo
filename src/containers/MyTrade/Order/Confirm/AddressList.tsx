import * as orderConfirmActions from 'actions/myTrade/order/confirm'
import { Flex, List } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import styles from './AddressList.less'

const Item = List.Item
const Brief = Item.Brief

const onClick = async () => {
  trackClickEvent({
    category: TrackEventExchange.OrderConfirmed.category,
    label: TrackEventExchange.OrderConfirmed.name1,
  })
  await Router.push({
    pathname: '/mytrade/address/form',
    query: {
      refer: location.pathname + location.search,
    },
  })
}

interface AddressListProps {
  info: any
  store: any
  onOrderConfirmActions: any
}
interface AddressListState {
  prompt: boolean
}

class AddressList extends React.Component<AddressListProps, AddressListState> {
  readonly state: AddressListState = {
    prompt: false,
  }
  async componentDidMount() {
    const { info, store } = this.props
    const hasList = (!!info && !!info.count()) || (!!store && !!store.count())
    if (hasList) {
      const data = await this.props.onOrderConfirmActions.getConfirmRemote()
      if (data.is_remote) {
        this.setState({
          prompt: data.is_remote,
        })
      }
    }
  }
  removePrompt = () => {
    this.setState({
      prompt: false,
    })
  }
  render() {
    const { info, store } = this.props
    const itemProps = {
      multipleLine: true,
      extra: <Icon className={styles.icon_edit} type={require('svg/edit.svg')} />,
      onClick,
    }

    const hasList = (!!info && !!info.count()) || (!!store && !!store.count())
    const storeAddress = !!store && store.get('details_address')

    return (
      <div className={classnames(styles.address_box, styles.box)}>
        {!hasList && (
          <div className={styles.empty_box}>
            <List>
              <Item onClick={onClick} extra={<Icon type={require('svg/edit.svg')} />}>
                <span className={styles.label}>请填写收货信息</span>
              </Item>
            </List>
          </div>
        )}
        {hasList && (
          <List>
            <Item {...itemProps}>
              <span className={styles.name}>
                {info.get('user_name')} {info.get('user_phone')}
              </span>
              <Brief>{storeAddress ? storeAddress : info.get('user_address')}</Brief>
            </Item>
          </List>
        )}
        {this.state.prompt && (
          <div className={styles.add_limit}>
            <span className={styles.jiao} />
            <Flex className={styles.limit_text} justify="between">
              收货地址暂不在配送范围内，换个地址试试<Icon
                type={require('svg/close.svg')}
                color="#fff"
                className={styles.icon}
                onClick={this.removePrompt}
              />
            </Flex>
          </div>
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onOrderConfirmActions: bindActionCreators(orderConfirmActions, dispatch),
})

export default connect(
  null,
  mapDispatchToProps,
)(AddressList)
