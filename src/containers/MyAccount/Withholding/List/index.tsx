import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import * as withHoldingActions from 'actions/myAccount/withholding/list'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Empty from './Empty'
import List from './List'
import Top from './Top'

export interface WithHoldingListProps extends ErrorObject {
  withholdingInfo: any
  onWithHoldingActions: any
}

class WithHoldingList extends React.Component<WithHoldingListProps> {
  static async getInitialProps({ store, isServer, req, res, asPath }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      // query.huabei = 1 代表只下来 花呗，不出现银行卡
      const data = await store.dispatch(withHoldingActions.fetchInfo({ req }))
      if (data.status) {
        return { error: data }
      }
    }
  }

  render() {
    const { error, withholdingInfo, onWithHoldingActions } = this.props

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>租金代扣管理</Header>,
      renderTabBar: <TabBar hidden={true} />,
      bgColor: '#fff',
    }

    const list = withholdingInfo.get('list')

    if (!list.size) {
      return (
        <Container {...containerProps}>
          <Empty
            showAddBtn={withholdingInfo.get('is_add')}
            popup={withholdingInfo.get('popup')}
            onWithHoldingActions={onWithHoldingActions}
          />
        </Container>
      )
    }

    return (
      <Container {...containerProps}>
        <Top item={list.get(0)} />
        <List
          showAddBtn={withholdingInfo.get('is_add')}
          list={list}
          popup={withholdingInfo.get('popup')}
          onWithHoldingActions={onWithHoldingActions}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  withholdingInfo: state.getIn(['myAccount', 'withholding', 'list']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onWithHoldingActions: bindActionCreators(withHoldingActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithHoldingList)
