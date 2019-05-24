import { Link } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import React from 'react'
import styles from './EmptyBox.less'

export interface EmptyBoxProps {}

const EmptyBox: React.FunctionComponent<EmptyBoxProps> = () => {
  return (
    <div className={styles.empty_box}>
      <p>还没有进行中的服务哦</p>
      <Link to={'/product/category'} trackEvent={TrackEventMyCenter.Order}>
        立即享受一站式用机服务 >
      </Link>
    </div>
  )
}

export default EmptyBox
