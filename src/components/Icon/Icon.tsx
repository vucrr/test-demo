import { Icon } from 'antd-mobile'
import React from 'react'

interface CustomSVG {
  default: {
    id: string
  }
}
interface IconProps {
  type: string | CustomSVG
  className?: string
  color?: string
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'lg'
  onClick?: React.MouseEventHandler<SVGSVGElement>
}

const MyIcon = ({ type, className = '', size = 'xs', ...props }: IconProps) => {
  if (typeof type === 'string') {
    return <Icon className={className} type={type} size={size} {...props} />
  }

  return (
    <svg className={`am-icon am-icon-${size} am-icon-${type.default.id} ${className}`} {...props}>
      <use xlinkHref={`#${type.default.id}`} />
    </svg>
  )
}

export default MyIcon
