import classnames from 'classnames'
import React from 'react'
import styles from './Box.less'

export interface BoxProps {
  title?: string
  classNames?: any
}

const Box: React.FunctionComponent<BoxProps> = ({ title, classNames, children }) => {
  return (
    <>
      {title && <div className={styles.box_title}>{title}</div>}
      <div className={classnames(classNames, styles.box)}>
        <div className={styles.box_content}>{children}</div>
      </div>
    </>
  )
}

export default Box
