import { LazyImage } from 'components'
import React from 'react'
import styles from './Top.less'

export interface TopProps {
  name: string
}

const Top: React.FunctionComponent<TopProps> = ({ name }) => {
  return (
    <div className={styles.box}>
      <LazyImage className={styles.icon} src={require('images/trade/results/banli1.png')} />
      <h5>恭喜您！初审已通过</h5>
      <p>
        您当前享有 <span>{name}</span>
        <br /> 专属下单权益
      </p>
    </div>
  )
}

export default Top
