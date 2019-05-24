import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
import { ErrorMsg } from 'components'
import styles from './SubmitBottom.less'

const SubmitBottom = ({ isAgree, hasAddress }) => {
  const checkValid = () => {
    if (!hasAddress) {
      ErrorMsg.show('请先完善收货人信息')
      return false
    }
    if (!isAgree) {
      ErrorMsg.show('请先同意《享换机相关协议》')
      return false
    }
    return true
  }
  const handleSubmit = () => {
    if (checkValid()) {
      // console.log('success!')
    }
  }

  return (
    <div className={styles.bottom_box}>
      <Button type="primary" className={styles.submit} onClick={handleSubmit}>
        额度授权
      </Button>
    </div>
  )
}

SubmitBottom.propTypes = {
  isAgree: PropTypes.bool.isRequired,
  hasAddress: PropTypes.bool.isRequired,
}

export default SubmitBottom
