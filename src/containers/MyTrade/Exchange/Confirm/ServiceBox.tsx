import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import { TrackEventExchange } from 'configs/trackEventLabels'
import Cookies from 'js-cookie'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './ServiceBox.less'

export interface ServiceBoxProps {
  list: any
  source?: 'exchange' | 'order'
}

export interface ServiceBoxState {
  open: boolean
  extendHeight: number
  phoneVas: number
  phoneNumber: string
}

class ServiceBox extends React.Component<ServiceBoxProps, ServiceBoxState> {
  readonly state: Readonly<ServiceBoxState> = {
    open: false,
    extendHeight: 0,
    phoneVas: -1,
    phoneNumber: '',
  }

  maxCount = 3
  componentDidMount() {
    this.setState({
      extendHeight: document.querySelector('#extend')!.clientHeight,
    })
    // 已选号码
    const selectPhone: any = Cookies.getJSON('phone_number')
    if (selectPhone) {
      window.setTimeout(() => {
        this.setState({
          phoneVas: parseInt(selectPhone.vas_id, 0),
          phoneNumber: selectPhone.phone_number,
        })
      }, 0)
    }
  }

  changeOpen = () => {
    trackClickEvent({
      category: TrackEventExchange.OrderConfirmed.category,
      label: TrackEventExchange.OrderConfirmed.name2,
    })
    this.setState(prevState => ({ open: !prevState.open }))
  }

  render() {
    const { list, source = 'order' } = this.props
    const { open, extendHeight } = this.state
    const isEmpty = list.count() === 0
    const listStart = list.slice(0, 3)
    const listEnd = list.slice(3)

    return (
      <div className={classnames(styles.service_box, styles[source], isEmpty && styles.empty)}>
        {!isEmpty && <div className={styles.title}>已选增值服务</div>}
        <div className={styles.list}>
          {listStart.map((item: any, key: number) => (
            <Flex align="start" className={styles.item} key={key}>
              <Icon className={styles.icon} type={require('svg/right-circle.svg')} />
              <p>
                {item.get('vas_name')}
                {item.get('vas_id') === this.state.phoneVas && <span>（手机号：{this.state.phoneNumber}）</span>}
              </p>
            </Flex>
          ))}
          <div className={styles.extend} style={{ height: open ? extendHeight : 0 }}>
            <div id="extend">
              {listEnd.map((item: any, key: number) => (
                <Flex align="start" className={styles.item} key={key}>
                  <Icon className={styles.icon} type={require('svg/right-circle.svg')} />
                  <p>
                    {item.get('vas_name')}
                    {item.get('vas_id') === this.state.phoneVas && <span>（手机号：{this.state.phoneNumber}）</span>}
                  </p>
                </Flex>
              ))}
            </div>
          </div>
        </div>
        {list.count() > this.maxCount && (
          <Flex
            className={classnames(styles.opt_box, styles[source], open && styles.open)}
            justify="center"
            onClick={this.changeOpen}
          >
            <span>{open ? '收起' : '展开'}</span>
            <Icon type={require('svg/arrow-right.svg')} className={styles.icon} />
          </Flex>
        )}
      </div>
    )
  }
}

export default ServiceBox
