import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import * as unionPayActions from 'actions/account/unionPay'
import { checkLogin } from 'actions/app'
import { Flex } from 'antd-mobile'
import { Button, Container, Header, Icon, Link, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Item from './Item'
import styles from './List.less'

interface UnionPayListProps extends ErrorObject {
  unionPayList: any
  onUnionPayActions: any
}

const EmptyBox = () => (
  <Flex className={styles.empty_box} direction="column" justify="center" align="center">
    <Icon className={styles.icon} type={require('svg/nodata.svg')} />
    <span>暂未添加银行卡</span>
    <Button type="primary" size="small" inline={true} onClick={() => Router.push('/account/unionPay/form?step=1')}>
      添加银行卡
    </Button>
  </Flex>
)

const UnionPayList: NextSFC2<UnionPayListProps> = ({ error, unionPayList }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const headerProps: any = {
    rightContentType: 'tabBar',
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>银行卡管理</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  return (
    <Container {...containerProps}>
      {unionPayList.size > 0 && (
        <div className={styles.list_box}>
          <Link to={'/account/unionPay/form?step=1'}>
            <span className={styles.btn_default}>
              <Icon className={styles.icon} type={require('svg/close.svg')} />添加银行卡
            </span>
          </Link>
          {unionPayList.map((item: any, index: number) => <Item item={item} key={index} type="list" />)}
        </div>
      )}
      {unionPayList.size === 0 && <EmptyBox />}
    </Container>
  )
}

UnionPayList.getInitialProps = async ({ store, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(unionPayActions.fetchList({ req }))
    if (data.status > 200) return { error: data }
  }
}

const mapStateToProps = (state: any) => ({
  unionPayList: state.getIn(['account', 'unionPay', 'list']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onUnionPayActions: bindActionCreators(unionPayActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnionPayList)
