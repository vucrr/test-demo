import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Flex, List } from 'antd-mobile'
import { Icon, Modal } from 'components'
import styles from './PopupModal.less'

class PopupModal extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {}

  handleChange = () => {
    this.props.onClose(false)
  }

  render() {
    const { visible, onClose } = this.props
    return (
      <Modal className={styles.popup_box} type="popup" visible={visible} onClose={onClose}>
        <List renderHeader={() => <div className={styles.title}>选择担保方式</div>} className="popup-list">
          <List.Item onClick={this.handleChange}>
            <Flex className={styles.item}>
              <div className={styles.left}>
                <Icon className={styles.icon} type="icon-logo_huabei" />
                <span>花呗预授权</span>
              </div>
              <span className={styles.icon_check_box} />
            </Flex>
          </List.Item>
          <List.Item onClick={this.handleChange}>
            <Flex className={styles.item}>
              <div className={styles.left}>
                <Icon className={styles.icon} type="icon-yinliandanselogo" />
                <span>花呗预授权</span>
              </div>
              <Icon className={classnames(styles.icon, styles.active)} type="icon-finish" />
            </Flex>
          </List.Item>
        </List>
      </Modal>
    )
  }
}

export default PopupModal
