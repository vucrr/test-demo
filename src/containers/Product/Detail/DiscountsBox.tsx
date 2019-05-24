import { Flex, Modal } from 'antd-mobile'
import { Icon, LazyImage } from 'components'
import React, { useState } from 'react'
import styles from './DiscountsBox.less'

const Item = Flex.Item

export interface PopupModalProps {
  list: any
  show: boolean
  onClose: Function
}

const PopupModal: React.FunctionComponent<PopupModalProps> = ({ list, show, onClose }) => {
  const modalProps = {
    popup: true,
    visible: show,
    className: styles.popup_modal_box,
    animationType: 'slide-up',
    onClose,
  } as any

  return (
    <Modal {...modalProps}>
      <Flex className={styles.header}>
        <Item>
          <span>领券</span>
        </Item>
        <Icon className={styles.btn_close} onClick={() => onClose()} type={require('svg/close.svg')} />
      </Flex>
      <div className={styles.body}>
        {list.map((item: any, index: number) => (
          <Flex key={index}>
            <LazyImage src={item.get('image')} alt="" />
            <Item>
              <h4>{item.get('title')}</h4>
              <h5>{item.get('desc')}</h5>
              <p>有效期：{item.get('time_desc')}</p>
            </Item>
            <a href={item.get('receive_button')}>立即领取</a>
          </Flex>
        ))}
      </div>
    </Modal>
  )
}

export interface DiscountsBoxProps {
  list: any
}

const DiscountsBox: React.FunctionComponent<DiscountsBoxProps> = ({ list }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const popupModalProps = {
    list,
    show: showPopup,
    onClose: () => {
      setShowPopup(false)
    },
  }
  return (
    <>
      <div className={styles.discount}>
        <Flex onClick={() => setShowPopup(true)}>
          <span>领券</span>
          <p>120元租机券；150元租机券；200元租机...</p>
          <Icon type={require('svg/arrow-right.svg')} className={styles.icon} />
        </Flex>
      </div>
      <PopupModal {...popupModalProps} />
    </>
  )
}

export default DiscountsBox
