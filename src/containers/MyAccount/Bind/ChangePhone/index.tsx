import { verifySMSAndValidateUser } from 'actions/myAccount/bind/changePhone'
import { Flex } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import ChangePhoneForm from './ChangePhoneForm'
import styles from './index.less'

const ChangePhone = (props: any) => {
  const containerProps = {
    renderHeader: <Header>账号绑定</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }
  return (
    <Container {...containerProps}>
      <Flex direction="column" align="start" className={styles.container}>
        <div className={styles.title}>为了更好的体验租机服务，请绑定手机号</div>
        <ChangePhoneForm {...props} />
      </Flex>
    </Container>
  )
}

const mapDispatch = { verifySMSAndValidateUser }

export default connect(
  null,
  mapDispatch,
)(ChangePhone)
