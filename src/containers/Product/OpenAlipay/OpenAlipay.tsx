import { Button } from 'antd-mobile'
import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './OpenAlipay.less'

interface ButtonProps extends React.HTMLAttributes<HTMLAnchorElement> {
  type?: 'outline'
}

const AlipayButton = ({ type, children, className, ...rest }: ButtonProps) => {
  const buttonClass = classnames(styles.button, className, type === 'outline' && styles.outline)
  return (
    <Button className={buttonClass} {...rest}>
      {children}
    </Button>
  )
}

interface OpenAlipayProps {
  openAlipay(): void
  onRedirectTrade?(): void
}

export const OpenAlipay = ({ onRedirectTrade }: OpenAlipayProps) => {
  const handleClick = () => {
    location.reload()
  }
  return (
    <div className={styles.container}>
      <Icon type={require('svg/alipay.svg')} className={styles.logo} />
      <h1>正在尝试打开支付宝APP...</h1>
      <div className={styles.wrapper}>
        {onRedirectTrade && (
          <AlipayButton type="outline" onClick={onRedirectTrade}>
            使用信用卡下单
          </AlipayButton>
        )}
        <AlipayButton onClick={handleClick} className={styles.right}>
          重新打开支付宝
        </AlipayButton>
      </div>
      <p className={styles.tips_box}>
        <span>还未下载支付宝APP，</span>
        <a href="https://ds.alipay.com/?from=mobileweb">立即下载></a>
      </p>
    </div>
  )
}

interface OpenAlipayMaskProps {
  isIOS: boolean
  closeAlipay(): void
}

export const OpenAlipayMask = ({ closeAlipay, isIOS }: OpenAlipayMaskProps) => {
  if (isIOS) {
    return (
      <div className={styles.mask} onClick={closeAlipay}>
        <img src={require('images/common/share-ios.png')} alt="Share Mask" />
      </div>
    )
  }
  return (
    <div className={styles.mask} onClick={closeAlipay}>
      <img src={require('images/common/share-android.png')} alt="Share Mask" />
    </div>
  )
}
