import React from 'react'
import styles from './WrapBox.less'

export interface WrapBoxProps {
  title: string
  children: any
}

const WrapBox: React.FunctionComponent<WrapBoxProps> = ({ title, children }) => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  )
}

export default WrapBox
