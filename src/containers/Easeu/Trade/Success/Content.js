import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import styles from './Content.less'

const Content = ({ isHuabei }) => {
  return (
    <div className={styles.content_box}>
      {!isHuabei && (
        <div className={styles.top}>
          <Flex
            className={classnames(styles.icon_box, !isHuabei && styles.icon_credit)}
            justify="center"
            align="center"
          >
            <Icon className={styles.icon} type={require('svg/right.svg')} />
          </Flex>
          <span>
            新机已经属于您啦!<br />请好好爱护它
          </span>
        </div>
      )}
      {isHuabei && (
        <div className={styles.top}>
          <Flex className={styles.icon_box} justify="center" align="center">
            <Icon className={styles.icon} type={require('svg/waiting.svg')} />
          </Flex>
          <span>
            冻结成功，请向店员确认审核结果<br />通过后再取走机器！
          </span>
        </div>
      )}
      <div className={styles.bottom}>
        <span className={styles.title}>温馨提示</span>
        <span>
          关注《轻松用》生活号<br />查看订单信息
        </span>
        <br />
        <a className={styles.btn_blue} href="/account/center">
          轻松用生活号
        </a>
      </div>
    </div>
  )
}
Content.propTypes = {
  isHuabei: PropTypes.bool.isRequired,
}

export default Content
