import classnames from 'classnames'
import { Icon } from 'components'
import Share from 'containers/Product/VideoDetail/Share'
import React from 'react'
import styles from './Introduce.less'

interface Props {
  introduce: any
}

interface State {
  hide: boolean
  show: boolean
  text: string
}

class Introduce extends React.Component<Props, State> {
  state = {
    hide: false,
    show: false,
    text: this.props.introduce.get('desc'),
  }
  contentRef = React.createRef<HTMLDivElement>()
  contentInnerRef = React.createRef<HTMLDivElement>()
  contentText = this.props.introduce.get('desc')

  componentDidMount() {
    const contentHeight = this.contentRef.current!.offsetHeight
    const contentInnerHeight = this.contentInnerRef.current!.offsetHeight

    if (contentHeight < contentInnerHeight) {
      this.contentText = this.contentText.slice(0, 42) + '...'
      this.setState({
        hide: true,
        text: this.contentText,
      })
    } else {
      this.setState({
        hide: false,
      })
    }
  }
  handleShow = () => {
    this.setState({
      hide: !this.state.hide,
      show: !this.state.show,
      text: this.props.introduce.get('desc'),
    })
  }
  handleHide = () => {
    this.setState({
      hide: !this.state.hide,
      show: !this.state.show,
      text: this.contentText,
    })
  }

  render() {
    const { introduce } = this.props
    return (
      <div className={styles.introduce_box}>
        <h2 className={styles.title}>{introduce.get('title')}</h2>
        <Share shareInfo={introduce} />
        <p className={styles.times}>{introduce.get('views')}次播放</p>
        <div className={classnames(styles.content, this.state.show && styles.show)} ref={this.contentRef}>
          <span>{this.state.text}</span>
          {this.state.hide && (
            <span className={styles.btn_toggle} onClick={this.handleShow}>
              展开<Icon className={styles.icon_arrow} type={require('svg/arrow-left.svg')} />
            </span>
          )}
          {this.state.show && (
            <span className={classnames(styles.btn_toggle, styles.show)} onClick={this.handleHide}>
              收起<Icon className={styles.icon_arrow} type={require('svg/arrow-left.svg')} />
            </span>
          )}
        </div>
        <div className={styles.contentInner} ref={this.contentInnerRef}>
          {introduce.get('desc')}
        </div>
      </div>
    )
  }
}

export default Introduce
