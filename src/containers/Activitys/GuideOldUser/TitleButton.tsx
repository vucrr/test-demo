import React from 'react'
import styles from './TitleButton.less'

export interface TitleButtomProps {
  title: string
}

const TitleButtom: React.FunctionComponent<TitleButtomProps> = ({ title }) => {
  return <div className={styles.titleButon}>{title}</div>
}

export default TitleButtom
