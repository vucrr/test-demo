import { NextSFC2 } from '@@types/next'
import { fetchManagement, unbindWechat } from 'actions/myAccount/bind/mangement'
import { ActionSheet, Flex, Modal } from 'antd-mobile'
import { Button, Container, Header, Icon, TabBar } from 'components'
import Router, { withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './index.less'

interface ManagementProps {
  router: any
  management: any
  unbind: Function
}

const Management: NextSFC2<ManagementProps> = (props: ManagementProps) => {
  const unbind = async () => {
    const result = await props.unbind()
    if (result) {
      await Router.replace({ pathname: '/myaccount/bind/result', query: { type: 'unbind' } })
    }
  }
  const handleActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['解除绑定', '取消'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      (id: number) => {
        if (id === 0) {
          Modal.alert(
            '提示',
            '将解除该享换机账号与微信号的绑定关系',
            [{ text: '解除', onPress: unbind }, { text: '暂不' }],
            'android',
          )
        }
      },
    )
  }

  const headerProps = {
    rightContent: <Icon type="ellipsis" onClick={handleActionSheet} />,
  }
  const containerProps = {
    renderHeader: <Header {...headerProps}>账号绑定</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const forward = (route: string) => async () => {
    await Router.push(route)
  }

  const showModal = () => {
    const redirect = encodeURIComponent('/myaccount/bind/result?type=bind')
    const route = '/myaccount/bind/change-phone?redirect=' + redirect
    Modal.alert(
      '提示',
      '更换账号将解除原享换机账号与微信号的绑定关系',
      [{ text: '暂不' }, { text: '去更换', onPress: forward(route) }],
      'android',
    )
  }

  const {
    management,
    router: {
      query: { phone },
    },
  } = props
  return (
    <Container {...containerProps}>
      <Flex direction="column">
        <Flex className={styles.title} direction="column">
          <img src={require('images/myaccount/bind/phone@2x.png')} alt="phone" />
          <p>享换机账号：{phone}</p>
          <p>已开启享换机账号与微信账号的绑定，可享账单推送等特权。</p>
        </Flex>
        <Button className={styles.btn} type="primary" onClick={forward(management.get('link'))}>
          {management.get('btnText')}
        </Button>
        <Button className={styles.btn} type="ghost" onClick={showModal}>
          更换账号
        </Button>
      </Flex>
    </Container>
  )
}

Management.getInitialProps = async ({ store, req }) => {
  await store.dispatch(fetchManagement({ req }))
}

const mapStateToProps = (state: any) => ({
  management: state.getIn(['myAccount', 'bind', 'management']),
})

const mapDispatchToProps = (dispatch: any) => ({
  unbind: bindActionCreators(unbindWechat, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Management))
