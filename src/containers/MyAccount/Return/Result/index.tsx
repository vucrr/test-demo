import { NextSFC2 } from '@@types/next'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import Top from './Top'

interface ReturnResultProps {
  cacheList: any
  onCacheListActions: any
}

const ReturnResult: NextSFC2<ReturnResultProps> = () => {
  const containerProps = {
    renderHeader: <Header>还机结果</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Top />
    </Container>
  )
}

export default ReturnResult
