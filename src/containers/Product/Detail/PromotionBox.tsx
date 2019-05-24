import { Flex, Modal } from 'antd-mobile'
import { Icon, LazyImage } from 'components'
import React, { Fragment, useState } from 'react'
import styles from './PromotionBox.less'

const Item = Flex.Item

export interface PopupModalProps {
  list: any
  show: boolean
  onClose: Function
}

const PopupModal: React.FunctionComponent<PopupModalProps> = ({ show, list, onClose }) => {
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
          <span>赠品</span>
        </Item>
        <Icon className={styles.btn_close} onClick={() => onClose()} type={require('svg/close.svg')} />
      </Flex>
      <div className={styles.body}>
        {list.map((item: any, index: number) => (
          <Flex key={index}>
            <LazyImage src={item.get('image')} alt="" className={styles.imgtp} />
            <Item className={styles.listtext}>
              <h5>{item.get('desc')}</h5>
              <p>{item.get('time_desc')}</p>
            </Item>
          </Flex>
        ))}
      </div>
    </Modal>
  )
}

export interface PromotionBoxProps {
  list: any
}

const PromotionBox: React.FunctionComponent<PromotionBoxProps> = ({ list }) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)

  const popupModalProps = {
    list,
    show: showPopup,
    onClose: () => {
      setShowPopup(!showPopup)
    },
  }
  return (
    <>
      <div className={styles.promotion}>
        <Flex onClick={() => setShowPopup(true)}>
          <span>赠品</span>
          <p>
            {list.map((item: any, index: number) => (
              <Fragment key={index}>
                {item.get('title')}
                {index < list.size - 1 && '；'}
              </Fragment>
            ))}
          </p>
          <Icon type={require('svg/arrow-right.svg')} className={styles.icon} />
        </Flex>
      </div>
      <PopupModal {...popupModalProps} />
    </>
  )
}

export default PromotionBox
