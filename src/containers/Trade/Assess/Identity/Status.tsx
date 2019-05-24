import { Icon } from 'components'
import React from 'react'
import styles from './Status.less'

interface Props {
  onIdentity: any
  identity: any
}

class Status extends React.Component<Props> {
  componentWillUnmount() {
    this.props.onIdentity.changeIdentityStatus('initial')
  }
  render() {
    const { identity } = this.props
    const identityStatus = identity.get('identityStatus')
    if (identityStatus === 'success') {
      return (
        <div className={styles.successBox}>
          <Icon type={require('svg/xuanzhong.svg')} />
          <span>上传成功，审核通过</span>
        </div>
      )
    } else if (identityStatus === 'fail_upload') {
      return (
        <div className={styles.contentBox}>
          <p className={styles.title}>上传失败，信息不匹配</p>
          <p className={styles.text}>经审核，身份证照片质量不佳，请确保上传照片的边框完整、图像清晰、光线均匀。</p>
        </div>
      )
    } else if (identityStatus === 'fail_match') {
      return (
        <div className={styles.contentBox}>
          <p className={styles.title}>上传失败，无法辨别照片</p>
          <p className={styles.text}>经审核，您上传的身份证信息与享换机账号的实名信息不匹配， 请重新上传。</p>
        </div>
      )
    } else {
      return (
        <div className={styles.contentBox}>
          <p className={styles.title}>上传身份证照片</p>
          <ul className={styles.text}>
            <li>• 照片仅作为信用评估材料，不会做其他用途</li>
            <li>• 请上传与享换机账户相同的身份证照片正反面</li>
            <li>• 拍照时请确保身份证边框完整、图像清晰、光线均匀</li>
          </ul>
        </div>
      )
    }
  }
}

export default Status
