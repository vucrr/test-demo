import { Button } from 'antd-mobile'
import { ButtonProps } from 'antd-mobile/es/button'
import classnames from 'classnames'
import React from 'react'
import styles from './Button.less'

interface MyButtonProps extends ButtonProps {
  children: any
  fixed?: boolean
  safeArea?: boolean
}

const MyButton = (props: MyButtonProps) => {
  const { className, children, fixed = false, safeArea = false, ...rest } = props
  const cx = classnames(styles.btn, fixed && styles.fixed, safeArea && styles.safe_area, className)
  return (
    <Button {...rest} className={cx}>
      {children}
    </Button>
  )
}

export default MyButton
