import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import Cookies from 'js-cookie'
import React from 'react'
import Box from './Box'
import styles from './ServiceBox.less'

export interface ServiceBoxProps {
  list: any
  priceInfo: any
}

export interface ServiceBoxState {
  phoneVas: number
  phoneNumber: string
}

class ServiceBox extends React.Component<ServiceBoxProps, ServiceBoxState> {
  readonly state: Readonly<ServiceBoxState> = {
    phoneVas: -1,
    phoneNumber: '',
  }

  componentDidMount() {
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

  render() {
    const { list, priceInfo } = this.props
    if (priceInfo.get('service_name') === '' && priceInfo.get('premium_name') === '' && !list.size) return null
    return (
      <Box title="已选服务">
        <div className={styles.list}>
          {priceInfo.get('service_name') !== '' && (
            <Flex align="start" justify="between" className={styles.item}>
              <Flex align="start" className={styles.left}>
                <Icon className={styles.icon} type={require('svg/right-circle.svg')} />
                <p>{priceInfo.get('service_name')}</p>
              </Flex>
              <div className={styles.right}>
                <span className={styles.price}>¥{priceInfo.get('ap_service_price')}</span>
              </div>
            </Flex>
          )}
          {priceInfo.get('premium_name') !== '' && (
            <Flex align="start" justify="between" className={styles.item}>
              <Flex align="start" className={styles.left}>
                <Icon className={styles.icon} type={require('svg/right-circle.svg')} />
                <p>{priceInfo.get('premium_name')}</p>
              </Flex>
              <div className={styles.right}>
                <span className={styles.price}>¥{priceInfo.get('premium_price')}</span>
              </div>
            </Flex>
          )}
          {list.map((item: any, key: number) => (
            <Flex align="start" justify="between" className={styles.item} key={key}>
              <Flex align="start" className={styles.left}>
                <Icon className={styles.icon} type={require('svg/right-circle.svg')} />
                <p>
                  {item.get('vas_name')}
                  {/* {item.get('vas_id') === this.state.phoneVas && <span>（手机号：{this.state.phoneNumber}）</span>} */}
                </p>
              </Flex>
              <div className={styles.right}>
                {item.get('vas_line_price') && <span className={styles.line_price}>{item.get('vas_line_price')}</span>}
                <span className={styles.price}>¥{item.get('vas_price')}</span>
              </div>
            </Flex>
          ))}
        </div>
        <div className={styles.service_tip}>以上费用需在第一期月租中支付</div>
      </Box>
    )
  }
}

export default ServiceBox
