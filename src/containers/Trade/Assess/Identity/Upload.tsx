import classNames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import { takePhoto } from 'utils/app'
import styles from './Upload.less'

interface Props {
  renderIcon?: any
  text: string
  onUploaded: Function
  onRemove: Function
  uploadFail: boolean
}

interface State {
  close: boolean
  img: any
  uploadFailState: boolean
}

class Upload extends React.Component<Props, State> {
  state = {
    close: false,
    img: '',
    uploadFailState: this.props.uploadFail,
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.uploadFail !== nextProps.uploadFail) {
      this.setState({
        uploadFailState: nextProps.uploadFail,
      })
    }
  }

  addImage = async () => {
    const data = await takePhoto()
    this.setState({
      img: data,
      close: true,
      uploadFailState: false,
    })
    this.props.onUploaded(data)
  }

  removeImage = () => {
    this.setState({
      img: '',
      close: false,
    })
    this.props.onRemove()
  }

  render() {
    const { renderIcon, text } = this.props
    const { img, close, uploadFailState } = this.state
    return (
      <div className={styles.uploadBox}>
        {renderIcon()}
        <div className={styles.btn} onClick={this.addImage}>
          <Icon type={require('svg/plus.svg')} className={styles.iconAdd} />
          <span>{text}</span>
        </div>
        <div className={classNames(styles.imgBox, img && styles.show)}>
          <img className={styles.img} src={img} />
        </div>
        {uploadFailState && (
          <div className={styles.uploadAgain} onClick={this.addImage}>
            {text}上传失败，点击重新上传
          </div>
        )}
        {close &&
          !uploadFailState && (
            <div className={styles.iconCloseWrap} onClick={this.removeImage}>
              <Icon type={require('svg/close-fill.svg')} className={styles.iconClose} />
            </div>
          )}
      </div>
    )
  }
}

export default Upload as any
