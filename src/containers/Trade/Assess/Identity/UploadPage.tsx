import { Toast } from 'antd-mobile'
import { Button, Icon, Loading } from 'components'
import Router from 'next/router'
import React from 'react'
import Upload from './Upload'
import styles from './UploadPage.less'

interface UploadPageProps {
  onIdentity: any
  identity: any
}

interface UploadPageState {
  img1: string
  img2: string
  img1UploadFail: boolean
  img2UploadFail: boolean
  disabled: boolean
  loading: boolean
  complete: boolean
}

class UploadPage extends React.Component<UploadPageProps, UploadPageState> {
  state = {
    img1: '',
    img2: '',
    img1UploadFail: false,
    img2UploadFail: false,
    disabled: true,
    loading: false,
    complete: false,
  }

  toggleBtnStatus = (whichOne: number, status = 'uploaded') => (data: string) => {
    this.setState<any>({ [whichOne === 1 ? 'img1' : 'img2']: status === 'uploaded' ? data : '' }, () => {
      const enabled = this.state.img1 && this.state.img2
      this.setState({ disabled: !enabled })
    })
    if (status === 'uploaded' && whichOne === 1) {
      this.setState({
        img1UploadFail: false,
      })
    }
    if (status === 'uploaded' && whichOne === 2) {
      this.setState({
        img2UploadFail: false,
      })
    }
  }

  handleClick = async () => {
    this.setState({
      loading: true,
    })
    const { onIdentity } = this.props
    const data = await onIdentity.postIdentity({
      font_img: this.state.img1,
      back_img: this.state.img2,
      action: 'UserBindIdentiImg',
    })
    const status = data.status
    if (status === 101) {
      onIdentity.changeIdentityStatus('success')
      this.setState({
        disabled: false,
        loading: false,
        complete: true,
      })
    } else {
      if (status === 10003) {
        // 正面上传失败
        onIdentity.changeIdentityStatus('fail_upload')
        this.setState({
          img1UploadFail: true,
        })
      } else if (status === 10005) {
        // 反面上传失败
        onIdentity.changeIdentityStatus('fail_upload')
        this.setState({
          img2UploadFail: true,
        })
      } else if (status === 10004) {
        // 正面上传失败
        onIdentity.changeIdentityStatus('fail_match')
        this.setState({
          img1UploadFail: true,
        })
      } else {
        Toast.info(data.msg, 2)
      }
      this.setState({
        disabled: true,
        loading: false,
      })
    }
  }

  goBack = () => {
    Router.back()
  }

  render() {
    return (
      <>
        <div className={styles.uploadPage}>
          <div className={styles.box}>
            <Upload
              onUploaded={this.toggleBtnStatus(1, 'uploaded')}
              onRemove={this.toggleBtnStatus(1, 'removed')}
              renderIcon={() => <Icon type={require('svg/idcard-people.svg')} className={styles.bgImg} />}
              text="人像面照片"
              uploadFail={this.state.img1UploadFail}
            />
          </div>
          <div className={styles.box}>
            <Upload
              onUploaded={this.toggleBtnStatus(2)}
              onRemove={this.toggleBtnStatus(2, 'removed')}
              renderIcon={() => <Icon type={require('svg/idcard-emblem.svg')} className={styles.bgImg} />}
              text="国徽面照片"
              uploadFail={this.state.img2UploadFail}
            />
          </div>
        </div>
        <div className={styles.btnWrap}>
          {!this.state.complete && (
            <Button className={styles.btn} type="primary" disabled={this.state.disabled} onClick={this.handleClick}>
              提交
            </Button>
          )}
          {this.state.complete && (
            <Button className={styles.btn} type="primary" onClick={this.goBack}>
              完成
            </Button>
          )}
        </div>
        <Loading loading={this.state.loading} />
      </>
    )
  }
}

export default UploadPage
