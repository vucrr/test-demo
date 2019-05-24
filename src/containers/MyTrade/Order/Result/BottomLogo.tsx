import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './BottomLogo.less'

export interface BottomLogoProps {}

const BottomLogo: React.FunctionComponent<BottomLogoProps> = () => {
  return (
    <div className={styles.btm_logo}>
      <img src={AssetImage.Trade.Results.ZhimaLogo} alt="" className={styles.huabei} />
      <p className={styles.logo_tit}>享换机携支付宝感谢您的每一次信用积累</p>
    </div>
  )
}

export default BottomLogo
