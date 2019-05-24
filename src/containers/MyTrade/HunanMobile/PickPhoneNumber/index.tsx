import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { getRecommendPhone } from 'actions/myTrade/hunanMobile'
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
  getRecommendPhone: Function
}

interface State {
  recommendList: any
}
class PickPhoneNumber extends React.Component<Props, State> {
  static async getInitialProps({ store, res, isServer, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(getRecommendPhone({}, req))
      if (data && data.errorMsg) {
        return { error: data }
      }
      return { data }
    }
  }

  state = {
    recommendList: this.props.data || [],
  }

  getRecommendPhone = async (query: any) => {
    const data = await this.props.getRecommendPhone(query)
    this.setState({
      recommendList: data,
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

    const { recommendList } = this.state

    return (
      <Container {...containerProps} className={styles.container}>
        {recommendList.length > 0 && (
          <Search recommendList={recommendList} changeRecommendList={this.getRecommendPhone} />
        )}
        {recommendList.length === 0 && <None />}
      </Container>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch: any) => ({
  getRecommendPhone: bindActionCreators(getRecommendPhone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickPhoneNumber)
