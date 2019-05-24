import { Icon } from 'components'
import React, { Component } from 'react'
import styles from './Picture.less'

interface Props {
  store: any
}

interface State {
  toggleShow: boolean
}

class Picture extends Component<Props, State> {
  state = { toggleShow: false }
  toggleShow = () => {
    this.setState({
      toggleShow: !this.state.toggleShow,
    })
  }

  render() {
    const { toggleShow } = this.state
    const { store } = this.props
    return (
      <>
        {!toggleShow && <img alt="thumb" className={styles.smallImg} src={store.img} onClick={this.toggleShow} />}
        {toggleShow && (
          <div className={styles.mask}>
            <img alt="big" className={styles.img} src={store.img} />
            <div className={styles.iconWrap} onClick={this.toggleShow}>
              <Icon className={styles.iconClose} type={require('svg/close.svg')} />
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Picture
