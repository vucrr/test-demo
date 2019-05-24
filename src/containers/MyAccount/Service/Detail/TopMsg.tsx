import { NoticeBar } from 'components'
import React from 'react'

function TopMsg({ detail }: any) {
  if (!detail.getIn(['tips_info', 'tip_title'])) return null
  return (
    <NoticeBar to={detail.getIn(['tips_info', 'tip_link'])} mode="link">
      {detail.getIn(['tips_info', 'tip_title'])}
    </NoticeBar>
  )
}

export default TopMsg
