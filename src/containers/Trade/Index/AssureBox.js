import React, { Component, Fragment } from 'react'
import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import { Icon, Modal } from 'components'
import PopupModal from './PopupModal'
import styles from './AssureBox.less'

const Item = Flex.Item

class AssureBox extends Component {
  state = {
    showTip: false,
    showPopup: false,
  }

  togglePopupModal = showPopup => {
    this.setState({ showPopup })
  }

  toggleTipsModal = showTip => {
    this.setState({ showTip })
  }

  render() {
    const { showTip, showPopup } = this.state

    return (
      <Fragment>
        <div className={styles.list_box}>
          <div className={styles.header}>
            <span className={styles.title}>押金费用</span>
          </div>
          <div className={styles.body}>
            <div className={styles.list}>
              <Flex className={styles.item}>
                <Item>总押金</Item>
                <span>￥8300.00</span>
              </Flex>
              <Flex className={styles.item}>
                <Item>总押金</Item>
                <span className={styles.primary}>￥8300.00</span>
              </Flex>
              <Flex className={classnames(styles.item, styles.des)}>
                <Icon className={styles.icon} type="icon-warning" /> 额度抵押金，需冻结预授权，无需还款，还机释放
              </Flex>
            </div>
          </div>
          <Flex className={styles.footer}>
            <span className={styles.label}>担保方式</span>
            <Item className={styles.item}>
              <span className={styles.btn_blue} onClick={() => this.toggleTipsModal(true)}>
                什么是花呗预授权
              </span>
              <Flex onClick={() => this.togglePopupModal(true)}>
                <Icon className={styles.icon} type="icon-logo_huabei" />
                <span>花呗预授权</span>
                <Icon className={styles.icon} type="icon-arrow-right" />
              </Flex>
            </Item>
          </Flex>
        </div>
        <PopupModal visible={showPopup} onClose={this.togglePopupModal} />
        <Modal visible={showTip} title="什么是花呗预授权" btnText="知道了" onClose={this.toggleTipsModal}>
          通过花呗冻结机器额度，可优先获得商品、享受服务，并不产生实际消费。押金部分还机后释放额度。
        </Modal>
      </Fragment>
    )
  }
}

export default AssureBox
