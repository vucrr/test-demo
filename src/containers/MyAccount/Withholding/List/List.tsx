import { Flex, Modal, Toast } from 'antd-mobile'
import { Icon } from 'components'
import { TrackEventRentWithholding } from 'configs/trackEventLabels'
import React from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import styles from './List.less'
import Popup from './Popup'

const Item = Flex.Item

export interface ListProps {
  showAddBtn: 0 | 1 // 1可以添加新代扣方式,0不可添加
  list: any
  popup: any
  onWithHoldingActions: any
}

export interface ListState {
  showPopup: boolean
}

class List extends React.Component<ListProps, ListState> {
  readonly state: Readonly<ListState> = {
    showPopup: false,
  }

  handleToggle = (showPopup: boolean, track?: TrackClickEventProperties) => {
    if (track) trackClickEvent(track)
    this.setState({ showPopup: showPopup })
  }

  validate = (item: any) => async () => {
    trackClickEvent({
      ...TrackEventRentWithholding.RentMethodManagement,
      label: 'RentMethodManagement' + item.get('code'),
    })
    const {
      onWithHoldingActions: { validateIfCanUnSign, unSign },
    } = this.props
    const data = await validateIfCanUnSign()
    // is_able 解约状态   0.无法解绑(有已支付的订单并且未还机或未买断时)  1.可解绑情况(需要取消订单)
    if (data.is_able === 1) {
      Modal.alert(
        '提示',
        data.des,
        [
          { text: '取消' },
          {
            text: '解绑',
            async onPress() {
              const body = {
                agreement_no: item.get('agreement_no'),
                type: item.get('type'),
              }
              const res = await unSign(body)
              Toast.info(res.errorMsg ? res.errorMsg : '解绑成功')
              setTimeout(function() {
                window.location.reload()
              }, 400)
            },
          },
        ],
        'android',
      )
    } else {
      Modal.alert('无法解绑', data.des, [{ text: '知道了' }], 'android')
    }
  }

  render() {
    const { showAddBtn, list, popup, onWithHoldingActions } = this.props
    const { showPopup } = this.state
    return (
      <div className={styles.list_box}>
        <h4>已签订以下代扣服务</h4>
        {list.size > 1 && (
          <span className={styles.sub_title}>优先使用您选择的代扣方式扣款，如代扣失败将尝试按照以下排列顺序扣款</span>
        )}
        <div className={styles.list}>
          {list.map((item: any, key: number) => (
            <Flex className={styles.item} key={key} onClick={this.validate(item)}>
              <Item className={styles.left}>
                <img src={item.get('icon')} /> {item.get('title')}
              </Item>
              <span className={styles.status}>{item.get('type') === 1 ? '已签约' : '已绑定'}</span>
              <Icon type={require('svg/arrow-right.svg')} size="xxs" color="#aaa" />
            </Flex>
          ))}
        </div>
        {!!showAddBtn && (
          <div className={styles.btn_box}>
            <span
              className={styles.btn_add}
              onClick={() =>
                this.handleToggle(true, {
                  ...TrackEventRentWithholding.RentMethodManagement,
                  label: 'AddRentMethod',
                })
              }
            >
              新增代扣方式 &gt;
            </span>
          </div>
        )}
        <Popup popup={popup} show={showPopup} onClose={this.handleToggle} onWithHoldingActions={onWithHoldingActions} />
      </div>
    )
  }
}

export default List
