import { NextSFC2 } from '@@types/next'
import { fetchResult } from 'actions/myAccount/bind/result'
import { Flex } from 'antd-mobile'
import { Button, Container, Header, TabBar } from 'components'
import Router, { withRouter } from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { noop } from 'utils/tools'
import styles from './index.less'

interface ResultProps {
  router: any
  result: any
}

enum Type {
  Bind = 'bind',
  Unbind = 'unbind',
}

const Result: NextSFC2<ResultProps> = props => {
  const {
    router: {
      query: { type },
    },
    result,
  } = props
  const { title, msg } = (function() {
    let title = '绑定成功'
    let msg = `已完成享换机账号 ${result.get('phone')} 与微信帐号的绑定，可享账单推送等特权。`
    if (type === Type.Unbind) {
      title = '解绑成功'
      msg = `已解除享换机账号 ${result.get('phone')} 与微信帐号的绑定。解绑后将无法享受账单推送等特权。`
    }
    return { title, msg }
  })()

  const headerProps = {
    rightContentType: 'tabBar',
    icon: '',
    onLeftClick: noop,
  }
  const containerProps = {
    renderHeader: <Header {...headerProps}>绑定结果</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const forward = (route: string) => async () => {
    await Router.push(route)
  }

  return (
    <Container {...containerProps}>
      <Flex direction="column">
        <Flex className={styles.title} direction="column">
          <img src={require('images/returnflow/detail/success.png')} alt="phone" />
          <p>{title}</p>
          <p>{msg}</p>
        </Flex>
        <Button className={styles.btn} type="primary" onClick={forward(result.get('link'))}>
          {result.get('btnText')}
        </Button>
      </Flex>
    </Container>
  )
}

Result.getInitialProps = async function({ store, query, req }: any) {
  await store.dispatch(fetchResult(query.phone, req))
}

const mapStateToProps = (state: any) => ({
  result: state.getIn(['myAccount', 'bind', 'result']),
})

export default connect(mapStateToProps)(withRouter(Result))
