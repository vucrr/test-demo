import { unlockPhone } from 'actions/enterprise/mytrade/pickNumber'
import * as detailActions from 'actions/product/detail'
import { Modal } from 'antd-mobile'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from './Header'
import ServiceBox from './ServiceBox'
import SkuBox from './SkuBox'
import SubmitButton from './SubmitButton'
import styles from './index.less'

interface PopupModalProps {
  show: boolean
  togglePopup: Function
  headers2: any
  property: any
  baseInfo: any
  onDetailActions: any
  onUnlockPhone: Function
}

const PopupModal: React.FunctionComponent<PopupModalProps> = props => {
  const { property, show, togglePopup } = props
  const { headers2, onDetailActions, onUnlockPhone } = props

  const popupModalId = property.get('popupModalId')
  const vasList = property.get('vasList')

  let scrollTop: any = null

  const setBodyFixed = () => {
    const body = document.body
    body.style.position = 'fixed'
    body.style.left = '0'
    body.style.bottom = '0'
    body.style.right = '0'

    if (typeof scrollTop === 'number') {
      body.style.top = -scrollTop + 'px'
    }
  }

  const setBodyStatic = () => {
    const body = document.body
    body.style.position = null
    body.style.left = null
    body.style.top = null
    body.style.bottom = null
    body.style.right = null

    if (typeof scrollTop === 'number') {
      document.body.scrollTop = scrollTop
      document.documentElement.scrollTop = scrollTop
    }
  }

  useEffect(
    () => {
      if (show) {
        // 打开时记录当前滚动位置
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        // 设为fixed
        setBodyFixed()
      } else {
        // 关闭时还原为默认
        setBodyStatic()
      }
      return setBodyStatic
    },
    [show],
  )

  const popupsStatus: any = {
    0: {
      title: '选择商品属性',
      buttonText: vasList && vasList.size ? '下一步' : '确定',
    },
    1: {
      title: '选择增值服务',
      buttonText: '确定',
    },
  }

  const modalProps = {
    popup: true,
    visible: show,
    className: styles.popup_modal_box,
    animationType: 'slide-up',
    onClose: (e: Event) => togglePopup(e, false),
  } as any

  const headerProps = {
    title: popupsStatus[popupModalId].title,
    property,
    onDetailActions,
    togglePopup,
  }

  const submitButtonProps = {
    buttonText: popupsStatus[popupModalId].buttonText,
    headers2,
    property,
    onDetailActions,
    onUnlockPhone,
  }

  const skuBoxProps = {
    property,
    onDetailActions,
  }

  const ServiceBoxProps = {
    property,
    onDetailActions,
  }

  return (
    <Modal {...modalProps}>
      <div className={styles.popup_panel}>
        <Header {...headerProps} />
        <div className={styles.popup_wrap}>
          <div className={styles.popup_content} style={{ transform: `translate3d(-${100 * popupModalId}%,0,0)` }}>
            <SkuBox {...skuBoxProps} />
            <ServiceBox {...ServiceBoxProps} />
          </div>
        </div>
        <SubmitButton {...submitButtonProps} />
      </div>
    </Modal>
  )
}

const mapStateToProps = (state: any) => ({
  headers2: state.getIn(['serverApp', 'headers2']),
  baseInfo: state.getIn(['product', 'detail', 'baseInfo']),
  property: state.getIn(['product', 'detail', 'property']),
})
const mapDispatchToProps = (dispatch: any) => ({
  onUnlockPhone: bindActionCreators(unlockPhone, dispatch),
  onDetailActions: bindActionCreators(detailActions, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupModal)
