import React from 'react'
import styles from './TitleBox.less'

export interface TitleBoxProps {
  children: React.ReactNode
}

const TitleBox: React.FunctionComponent<TitleBoxProps> = ({ children }) => {
  return <div className={styles.title}>{children}</div>
}

export default TitleBox
