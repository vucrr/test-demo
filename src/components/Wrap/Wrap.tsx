import classnames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './Wrap.less'

export interface WrapProps {
  children: ReactNode
  className?: string
  bgColor?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  WhiteSpace?: number // 上下留白 padding
}

const Wrap: React.FunctionComponent<WrapProps> = ({ children, className, size = 'lg', bgColor, WhiteSpace }) => {
  const padding = WhiteSpace
    ? {
        padding: `${WhiteSpace}px 15px`,
      }
    : null
  return (
    <div className={classnames(styles.wrap, styles[size], className)} style={{ backgroundColor: bgColor, ...padding }}>
      {children}
    </div>
  )
}

export default Wrap
