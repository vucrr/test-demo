import { Modal } from 'antd-mobile'
import { ModalProps } from 'antd-mobile/lib/modal/Modal'
import classnames from 'classnames'
import React from 'react'
import styles from './Modal.less'

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

interface MyModelProps {
  type?: 'transparent' | 'popup'
  visible: boolean
  title?: string
  btnText?: string
  onClose: Function
  className?: string
  maskClosable?: boolean
  children?: any
}

class MyModal extends React.Component<MyModelProps> {
  static defaultProps = {
    visible: false,
    type: 'transparent',
    maskClosable: true,
  }

  render() {
    const { type, visible, title, btnText, onClose, className, maskClosable, children } = this.props

    const isPopup = type === 'popup'

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
      title: title && <span className={styles.title}>{title}</span>,
      visible,
      transparent: !isPopup,
      popup: isPopup,
      animationType: isPopup ? 'slide-up' : 'fade',
      maskClosable: maskClosable,
      className: classnames(styles.modal_box, !isPopup && styles.transparent, className),
      wrapProps: { onTouchStart: onWrapTouchStart },
      onClose: () => {
        onClose(false)
      },
    }

    return (
      <Modal {...modalProps}>
        {isPopup && children}
        {!isPopup && <div className={styles.text}>{children}</div>}
        {btnText && (
          <div className={styles.footer}>
            <span className={classnames(styles.btn, 'btn')} onClick={() => onClose(false)}>
              {btnText}
            </span>
          </div>
        )}
      </Modal>
    )
  }
}

export default MyModal
