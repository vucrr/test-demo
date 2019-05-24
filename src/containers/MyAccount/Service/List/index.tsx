import { NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as serviceActions from 'actions/myAccount/service/list'
import { Container, Header, Icon, Link, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Empty from '../Empty'
import styles from '../Empty.less'
import List from './List'

interface Query {
  status?: '1' | '2' // 1非历史合约  2 历史合约
}

interface ServiceListProps extends ErrorObject {
  info: any
  query: Query
  onServiceActions: any
}

const ServiceList: NextSFC2<ServiceListProps> = ({ error, query, info, onServiceActions }) => {
  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>{query.status === '2' ? '历史服务' : '我的服务'}</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const listProps = {
    status: query.status,
    list: info.get('list').toJS(),
    page: info.get('page'),
    hasMore: info.get('has_more'),
    onServiceActions,
  }

  const isEmpty = listProps.list.length === 0
  const isHistory = query.status === '2'

  return (
    <Container {...containerProps}>
      {!isEmpty && <List {...listProps} />}
      {isEmpty && (
        <Empty
          content={
            <>
              您暂时还没有{isHistory ? '历史' : '进行中的'}服务哦<br />
              {!isHistory && (
                <Link className={styles.link} to="/myaccount/service/list?status=2">
                  历史服务 <Icon type="right" />
                </Link>
              )}
            </>
          }
        />
      )}
    </Container>
  )
}

ServiceList.getInitialProps = async ({ store, query, isServer, res, asPath, req }) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
  if (isLogin) {
    const data = await store.dispatch(
      serviceActions.fetchList({ status: query.status, page: 1, limit: 20 }, false, req),
    )
    if (data && data.status) {
      return { error: data }
    }
  }
}

const mapStateToProps = (state: any) => ({
  info: state.getIn(['myAccount', 'service', 'list']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onServiceActions: bindActionCreators(serviceActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ServiceList)
