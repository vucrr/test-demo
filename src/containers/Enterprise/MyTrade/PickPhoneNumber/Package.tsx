import { Icon } from 'components'
import React from 'react'
import styles from './Package.less'

export interface Props {
  show: boolean
}

class Package extends React.Component<Props, any> {
  render() {
    const { show } = this.props
    return (
      <>
        {show && (
          <div className={styles.box}>
            <h2 className={styles.title}>恭喜您获得</h2>
            <div className={styles.content}>
              <div className={styles.iconWrap}>
                <Icon type={require('svg/hunan-mobile.svg')} className={styles.icon} />
              </div>
              <div className={styles.info}>
                <p>移动话费套餐(赠送) ￥0</p>
                <p className={styles.detail}>套餐包含全国语音1000分钟通话/月，畅享国内流量无限量</p>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Package
