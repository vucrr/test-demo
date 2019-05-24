import { Modal } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import Form from './Form'

const alert = Modal.alert

const RealName = (props: any) => {
  const headerProps = {
    rightContentType: 'tabBar',
    onLeftClick: () => {
      alert('', '你还未完成实名认证，确定要退出吗？', [{ text: '取消' }, { text: '退出' }], 'android')
    },
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>实名认证</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      <Form onCertify={props.onCertify} />
    </Container>
  )
}

export default RealName
