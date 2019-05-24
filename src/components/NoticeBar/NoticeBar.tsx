import { NoticeBar } from 'antd-mobile'
import { NoticeWebProps } from 'antd-mobile/lib/notice-bar'
import Router from 'next/router'
import React from 'react'
import './NoticeBar.less'

export interface NoticeBarProps extends NoticeWebProps {
  children: string
  to?: string
  native?: boolean
}

const MyNoticeBar = ({ children, mode, to, native, ...reset }: NoticeBarProps) => {
  const rest = {
    icon: <i />,
    onClick: async () => {
      if (native) {
        window.location.href = to || ''
        return
      }
      to && (await Router.push(to))
    },
    marqueeProps: { loop: true, text: children },
    ...reset,
  }
  return <NoticeBar mode={mode} {...rest} />
}

export default MyNoticeBar
