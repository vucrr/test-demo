import { Flex, Modal } from 'antd-mobile'
import { ModalProps } from 'antd-mobile/lib/modal/Modal'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './PopupModal.less'

function closest(el: any, selector: string) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el
    }
    el = el.parentElement
  }
  return null
}

interface MyModelProps extends ModalProps {
  bodyClassName?: string
}

class MyModal extends React.Component<MyModelProps> {
  static defaultProps = {
    visible: false,
    popup: true,
    type: 'transparent',
    animationType: 'slide-up',
    maskClosable: true,
  }

  render() {
    const { title, className, onClose, children, bodyClassName, ...reset } = this.props

    const onWrapTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      // fix touch to scroll background page on iOS
      if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
        return
      }
      const pNode = closest(e.target, '.am-modal-content')
      if (!pNode) {
        e.preventDefault()
      }
    }

    const modalProps: ModalProps = {
      ...reset,
      className: classnames(styles.popup_modal, className),
      wrapProps: { onTouchStart: onWrapTouchStart },
      onClose: () => {
        onClose && onClose()
      },
    }

    return (
      <Modal {...modalProps}>
        <Flex className={styles.header}>
          <Flex.Item className={styles.title}>{title}</Flex.Item>
          <Icon type={require('svg/close.svg')} onClick={onClose} />
        </Flex>
        <div className={classnames(bodyClassName, 'popup-body')}>{children}</div>
      </Modal>
    )
  }
}

export default MyModal
