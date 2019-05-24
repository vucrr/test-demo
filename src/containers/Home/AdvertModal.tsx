import classnames from 'classnames'
import { Icon } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import Cookies from 'js-cookie'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './AdvertModal.less'

interface AdvertModalProps {
  popup: any
}

class AdvertModal extends React.Component<AdvertModalProps, { show: boolean }> {
  readonly state = {
    show: false,
  }

  componentDidMount() {
    const { popup } = this.props
    const curPopupId = popup.get('id').toString()
    const popupId = Cookies.get('popupId')
    if (!popupId || (popupId && popupId !== curPopupId)) {
      this.handleShow()
      Cookies.set('popupId', curPopupId, { expires: 365 })
    }
  }

  handleShow() {
    this.setState({ show: true })
  }

  handleClose = () => {
    trackClickEvent({ category: TrackEventHome.Category, label: TrackEventHome.AdvertModal.Close })
    this.setState({ show: false })
  }

  track = () => {
    trackClickEvent({ category: TrackEventHome.Category, label: TrackEventHome.AdvertModal.Redirect })
  }

  render() {
    const { popup } = this.props
    const { show } = this.state

    return (
      <div className={classnames(styles.modal_box, show && styles.show)}>
        <a href={popup.get('redirect_url')} onClick={this.track}>
          <img src={popup.get('img')} />
        </a>
        <span onClick={this.handleClose}>
          <Icon className={styles.btn_close} type={require('svg/close.svg')} />
        </span>
      </div>
    )
  }
}

export default AdvertModal
