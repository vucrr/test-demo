import { NoticeBar } from 'antd-mobile'
import { Icon } from 'components'
import React from 'react'
import PropTypes from 'prop-types'

const NoticeBarBox = ({ info }) => {
  const noticeType = info.get('tips_type')

  const noticeBarProps = {
    marqueeProps: {
      loop: true,
      text: info.get('tips_title'),
    },
    icon: <Icon type={require('svg/warning-circle.svg')} size="xs" />,
    mode: noticeType === 1 ? 'link' : '',
    onClick: () => {
      if (noticeType === 1) {
        window.location.href = info.get('tips_link')
      }
    },
  }

  return <NoticeBar {...noticeBarProps} />
}

NoticeBarBox.propTypes = {
  info: PropTypes.any.isRequired,
}

export default NoticeBarBox
