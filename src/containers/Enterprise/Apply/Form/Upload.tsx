import { Flex } from 'antd-mobile'
import { Icon, LazyImage } from 'components'
import React, { MouseEvent } from 'react'
import { takePhoto } from 'utils/app'
import styles from './Upload.less'

export interface UploadProps {
  value: string
  editable?: boolean
  onChange?: any
}

export interface UploadState {
  file: string
  showModal: boolean
}

class Upload extends React.Component<UploadProps, UploadState> {
  static defaultProps = {
    editable: true,
  }

  readonly state: Readonly<UploadState> = {
    file: this.props.value,
    showModal: false,
  }

  componentWillReceiveProps(nextProps: UploadProps) {
    if ('value' in nextProps && this.props.value !== nextProps.value) {
      const file = nextProps.value
      this.setState({ file })
    }
  }

  onUpload = async () => {
    const base64File = await takePhoto()
    this.setState({ file: base64File })
    const { editable, onChange } = this.props
    editable && onChange && onChange(base64File)
  }

  onRemove = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    this.setState({ file: '' })
    const { onChange } = this.props
    onChange && onChange('')
  }

  hanldeShowModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    this.setState({ showModal: true })
  }

  render() {
    const { file, showModal } = this.state
    const showThumb = file.length > 0

    return (
      <>
        <Flex className={styles.upload} justify="center" onClick={this.onUpload}>
          {!showThumb && <Icon className={styles.upload_icon} type={require('svg/camera.svg')} color="#ddd" />}
          {showThumb && (
            <div className={styles.thumb} onClick={this.hanldeShowModal}>
              <LazyImage className={styles.img} src={file} />
              <Icon size="sm" className={styles.close} type={require('svg/close-fill.svg')} onClick={this.onRemove} />
            </div>
          )}
        </Flex>
        {showModal && (
          <Flex className={styles.upload_bg} justify="center" onClick={() => this.setState({ showModal: false })}>
            <LazyImage
              className={styles.img}
              src={file}
              onClick={e => {
                e.stopPropagation()
              }}
            />
            <Icon
              size="md"
              className={styles.close}
              type={require('svg/close-fill.svg')}
              onClick={() => this.setState({ showModal: false })}
            />
          </Flex>
        )}
      </>
    )
  }
}

export default Upload
