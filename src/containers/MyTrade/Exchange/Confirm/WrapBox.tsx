import React from 'react'
import styles from './WrapBox.less'

export interface WrapBoxProps {
  children: React.ReactElement<any>[]
}

const WrapBox: React.FunctionComponent<WrapBoxProps> = ({ children }) => {
  return <div className={styles.wrap_box}>{children}</div>
}

export default WrapBox
