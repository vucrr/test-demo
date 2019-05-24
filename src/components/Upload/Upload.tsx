import { uploadBase64 } from 'actions/upload'
import { ImagePicker } from 'antd-mobile'
import { ImagePickerPropTypes } from 'antd-mobile/es/image-picker'
import classnames from 'classnames'
import Loading from 'components/Loading/Loading'
import { FileReturns } from 'interfaces/upload'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { zipBase64 } from 'utils/tools'
import styles from './Upload.less'

interface UploadProps extends ImagePickerPropTypes {
  value: Array<object>
  editable: boolean
  uploadBase64: Function
}

interface UploadState {
  files?: Array<object>
  loading: boolean
}

class Upload extends React.Component<UploadProps, UploadState> {
  static defaultProps = {
    editable: true,
  }

  readonly state = {
    files: this.props.value,
    loading: false,
  }

  componentWillReceiveProps(nextProps: UploadProps) {
    if ('value' in nextProps && this.props.value !== nextProps.value) {
      const files = nextProps.value
      this.setState({ files })
    }
  }

  handleChange = async (files: Array<any>, operationType: string, index?: number) => {
    if (!this.props.editable) {
      return
    }
    if (!this.props.value) {
      this.setState({ files })
    }

    this.setState({
      loading: true,
    })

    for (let i = 0; i < files.length; i++) {
      const base64 = await zipBase64(files[i].url)
      const res: FileReturns = await this.props.uploadBase64(base64)
      files[i].url = base64
      files[i].file_name = res.file_name
      files[i].file_url = res.file_url
    }

    this.setState({
      loading: false,
    })

    const onChange = this.props.onChange
    if (onChange) {
      onChange(files, operationType, index)
    }
  }

  render() {
    const { files } = this.state
    const { className, multiple, selectable, accept, onAddImageClick, onImageClick, onFail } = this.props
    const cx = classnames(!this.props.editable && styles.disabled, className)
    return (
      <div className={styles.container}>
        <ImagePicker
          className={cx}
          multiple={multiple}
          selectable={selectable}
          files={files}
          accept={accept}
          onChange={this.handleChange}
          onImageClick={onImageClick}
          onAddImageClick={onAddImageClick}
          onFail={onFail}
        />
        <Loading loading={this.state.loading} />
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: any) => ({
  uploadBase64: bindActionCreators(uploadBase64, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Upload as any)
