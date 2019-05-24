import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { getPickNumber } from 'actions/enterprise/mytrade/pickNumber'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import None from './None'
import Search from './Search'
import styles from './index.less'

interface Props extends ErrorObject {
  data: any
  getPickNumber: Function
  query: any
}

interface State {
  recommendList: any
  page_index: number
  packageName: any
}
class PickPhoneNumber extends React.Component<Props, State> {
  static async getInitialProps({ store, query, res, isServer, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const newQuery = { ...query, page_size: 6 }
      const data = await store.dispatch(getPickNumber({ query: newQuery, req }))
      if (data && data.errorMsg) {
        return { error: data }
      }
      return { data }
    }
  }

  state = {
    recommendList: this.props.data.get('phone') || [],
    page_index: this.props.data.get('page_index'),
    packageName: this.props.data.get('subtitle'),
  }

  getPickNumber = async () => {
    const changQuery = { ...this.props.query, page_size: 6, page_index: this.state.page_index + 1 }
    await this.props.getPickNumber({ query: changQuery })
    this.setState({
      recommendList: this.props.data.get('phone'),
      page_index: this.props.data.get('page_index'),
    })
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const headerProps = {
      rightContentType: 'tabBar',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>选新手机号</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    const { recommendList, packageName } = this.state

    return (
      <Container {...containerProps} className={styles.container}>
        {recommendList.size > 0 && (
          <Search
            recommendList={recommendList}
            changeRecommendList={this.getPickNumber}
            query={this.props.query}
            packageName={packageName}
          />
        )}
        {recommendList.size === 0 && <None />}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  data: state.getIn(['enterprise', 'mytrade', 'pickNumber']),
})

const mapDispatchToProps = (dispatch: any) => ({
  getPickNumber: bindActionCreators(getPickNumber, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickPhoneNumber)
