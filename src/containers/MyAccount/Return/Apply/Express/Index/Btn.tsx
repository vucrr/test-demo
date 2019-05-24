import { List, Modal } from 'antd-mobile'
import { Button, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventMyAccountReturn } from 'configs/trackEventLabels'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './Btn.less'
import { expressTypeList } from './index'

const alert = Modal.alert
const Item = List.Item
const Brief = Item.Brief
export interface BtnProps extends withLoadingProps {
  expressInfo: any
  onExpress: any
  query: any
  expressType: number
  orderType: number
}

class Btn extends React.Component<BtnProps> {
  modalList = () => {
    const { expressInfo, expressType } = this.props
    if (expressType === expressTypeList.bySelf) {
      return {
        content: [
          {
            label: '寄件方式：',
            text: '自行快递寄回',
          },
          {
            label: '物流单号：',
            text: expressInfo.get('expressNo'),
          },
        ],
      }
    } else {
      const mapAddressInfo = expressInfo.getIn(['expressAddress', 'address'])
      const userInfo = expressInfo.getIn(['expressAddress', 'user'])
      const { contact, phone, house_number } = userInfo.toJS()
      const { province, city, address, detail_address } = mapAddressInfo.toJS()
      return {
        content: [
          {
            label: '取件方式：',
            text: '预约上门取件',
          },
          {
            label: '联系方式：',
            text: `${contact}  ${phone}`,
          },
          {
            label: '取件地址：',
            text: province + city + address + detail_address + house_number,
          },
        ],
      }
    }
  }

  showModal = (params: any) => {
    const modalContent = this.modalList().content
    return alert(
      '确认还机信息',
      <div className={styles.confirmModal}>
        {modalContent.map((item: any, index: number) => (
          <Item key={index}>
            {item.label}
            <Brief>{item.text}</Brief>
          </Item>
        ))}
        <p className={styles.tips}>
          <i>*</i>提交后以上信息不可修改
        </p>
      </div>,
      [{ text: '取消' }, { text: '确定', onPress: () => this.onSubmit(params) }],
      'android',
    )
  }

  handleClick = async () => {
    const trackEvent = {
      label: `${TrackEventMyAccountReturn.Apply.name11}`,
      category: TrackEventMyAccountReturn.Apply.category,
    }
    trackClickEvent(trackEvent)
    const { query, expressInfo, expressType, orderType } = this.props
    const detail = expressInfo.get('detail')
    const userInfo = expressInfo.getIn(['expressAddress', 'user'])
    const userPhone = {
      user_phone: expressType === expressTypeList.bySelf ? detail.get('user_phone') : userInfo.get('phone'),
    }
    const sendPrams = {
      trade_no: query.returnflow_trade_no,
      type: expressType,
      ...userPhone,
      orderType,
    }
    let params: any
    if (expressType === expressTypeList.bySelf) {
      params = {
        ...sendPrams,
        express_number: expressInfo.get('expressNo').toString(),
      }
    } else {
      const mapAddressInfo = expressInfo.getIn(['expressAddress', 'address'])
      const { longitude, ...restAddressInfo } = mapAddressInfo && mapAddressInfo.toJS()
      params = {
        ...sendPrams,
        name: userInfo.get('contact'),
        time: expressInfo.get('expressTime').get('pickUpTime'),
        long: longitude,
        house_number: userInfo.get('house_number'),
        ...restAddressInfo,
      }
    }
    // 换机单
    if (orderType === 2) {
      this.showModal(params)
    } else {
      await this.onSubmit(params)
    }
  }

  onSubmit = async (params: any) => {
    const { onExpress, setLoading } = this.props
    setLoading(true)
    const data = await onExpress.createReturnBill({ ...params })
    if (data) {
      // 清掉取件信息的 cookie
      const userId: any = Cookies.get('user_id_v2')
      Cookies.remove('userForm_' + userId)
      await Router.replace({
        pathname: window.location.pathname,
        query: {
          sub_trade_no: data.sub_trade_no,
        },
      })
      setLoading(false)
      const title = this.props.orderType === 1 ? '申请成功' : '提交成功'
      alert(
        title,
        '还机后没手机用了？先租个新机用起来吧!',
        [
          {
            text: '暂不',
            onPress: () => {
              const trackEvent = {
                label: `${TrackEventMyAccountReturn.Detail.name1}`,
                category: TrackEventMyAccountReturn.Detail.category,
              }
              trackClickEvent(trackEvent)
            },
          },
          {
            text: '选新机',
            onPress: async () => {
              const trackEvent = {
                label: `${TrackEventMyAccountReturn.Detail.name2}`,
                category: TrackEventMyAccountReturn.Detail.category,
              }
              trackClickEvent(trackEvent)
              await Router.push('/product/category')
            },
          },
        ],
        'android',
      )
    } else {
      setLoading(false)
    }
  }

  render() {
    const { expressInfo, expressType, orderType } = this.props
    const enabled =
      expressType === expressTypeList.bySelf
        ? expressInfo.get('expressNo')
        : expressInfo.get('expressAddress').size > 0 && expressInfo.get('expressTime').size > 0
    return (
      <Button fixed={true} disabled={!enabled} onClick={this.handleClick} className={styles.btn}>
        {orderType === 1 ? '提交申请' : '确定'}
      </Button>
    )
  }
}

export default withLoading(Btn)
