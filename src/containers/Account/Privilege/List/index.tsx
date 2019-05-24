import { GetInitialPropsContext } from '@@types/next'
import { fetchPrivilegeList } from 'actions/account/privilege'
import { checkLogin, redirectLogin } from 'actions/app'
import { Button } from 'antd-mobile'
import { Container, Header, Icon, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import PrivilegeItem from './PrivilegeItem'
import styles from './index.less'

interface PrivilegeListProps extends ErrorObject {
  privilege: any
}

class PrivilegeList extends React.Component<PrivilegeListProps> {
  static async getInitialProps({ store, query, isServer, asPath, res, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(fetchPrivilegeList(query, req))
      if (data.status) {
        if (data.status === 401) {
          await redirectLogin({ isServer, res, asPath })
        }
        return { error: data }
      }
    }
  }

  handleSubmit = async () => {
    await Router.push({
      pathname: '/product/category',
      query: {
        tag: 2,
      },
    })
  }

  static renderList(list: any) {
    return (
      <div className={styles.listWrapper}>
        {list.map((item: any) => <PrivilegeItem key={item.get('id')} item={item} />)}
      </div>
    )
  }

  renderTip() {
    return (
      <div className={styles.tipWrapper}>
        <Icon className={styles.icon} type={require('svg/warning-gray.svg')} />
        <p className={styles.description}>目前只有租机用户才可获得权益哦~</p>
        <Button className={styles.submit} onClick={this.handleSubmit}>
          立即租机
        </Button>
      </div>
    )
  }

  render() {
    const { error, privilege } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>我的权益</Header>,
      renderTabBar: <TabBar selectedTab="myCenter" hidden={true} />,
    }
    const list = privilege.get('list')
    return <Container {...containerProps}>{list.size ? PrivilegeList.renderList(list) : this.renderTip()}</Container>
  }
}

const mapStateToProps = (state: any) => ({
  privilege: state.getIn(['account', 'privilege']),
})

export default connect(mapStateToProps)(PrivilegeList)
