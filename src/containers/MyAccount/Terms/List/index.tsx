import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { fetchTermsList } from 'actions/myAccount/termsList'
import { Flex } from 'antd-mobile'
import { Container, Header, Icon, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import * as React from 'react'
import { connect } from 'react-redux'
import styles from './index.less'

export interface TermsListProps extends ErrorObject {
  list: any
}

export interface TermsListState {}

class TermsList extends React.Component<TermsListProps, TermsListState> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(fetchTermsList({ query, req }))
      if (data.status) {
        return { error: data }
      }
    }
  }
  toLink = (to: string) => {
    location.href = to
  }
  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const containerProps = {
      renderHeader: <Header>我的服务协议</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    // const tabProps: any = {
    //   tabs: [{ title: '合约中' }, { title: '已失效' }],
    //   // initialPage,
    //   tabBarTextStyle: { fontSize: '14px' },
    //   tabBarBackgroundColor: '#222', // tabBar背景色
    //   tabBarInactiveTextColor: '#999',
    //   tabBarActiveTextColor: '#fff', // tabBar激活Tab文字颜色
    //   tabBarUnderlineStyle: { border: '0.02rem solid #FE5649' }, // tabBar下划线样式
    //   onChange: (_: string, index: number) => {
    //     console.log(index)
    //   },
    // }
    return (
      <Container {...containerProps}>
        {/* <Tabs {...tabProps} /> */}
        <div className={styles.box}>
          {this.props.list.map((item: any, index: number) => {
            return (
              <Flex justify="between" className={styles.row} onClick={() => this.toLink(item.get('url'))} key={index}>
                {item.get('title')}
                <Icon color=" #AAAAAA" type={require('svg/arrow-right.svg')} className={styles.to_icon} />
              </Flex>
            )
          })}
        </div>
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  list: state.getIn(['myAccount', 'termsList', 'list']),
})
export default connect(mapStateToProps)(TermsList)
