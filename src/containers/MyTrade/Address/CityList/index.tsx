import { GetInitialPropsContext } from '@@types/next'
import { checkLogin, redirectLogin } from 'actions/app'
import { getCityList } from 'actions/myTrade/address/cityList'
import { CityList, Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import TopBar, { forward } from './TopBar'
import styles from './index.less'

const containerProps = {
  renderHeader: <Header>选择城市</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

interface CityListProps {
  error: any
  all: any
  hot: any
  query: any
}

interface CityListState {
  dataSource: unknown
  isLoading: boolean
}

class CityListPage extends React.Component<CityListProps, CityListState> {
  static async getInitialProps({ store, isServer, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const data = await store.dispatch(getCityList(req))
      if (data && data.status === 401) await redirectLogin({ isServer, res, asPath })
    }
    return false
  }

  renderHeader = () => {
    const { hot, query } = this.props
    return (
      <div className={styles.topWrapper}>
        <span>热门城市</span>
        <div className={styles.wrapper}>
          {hot.map((item: any, i: number) => {
            const city = item.get('city_name')
            return (
              <div className={styles.tag} key={i} onClick={() => forward(city, query)}>
                {city}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    const { error, all, query } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    return (
      <Container {...containerProps}>
        <TopBar query={query} />
        <CityList list={all.toJS()} onClickItem={item => forward(item, query)} renderHeader={this.renderHeader} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  hot: state.getIn(['myTrade', 'address', 'city', 'hot']),
  all: state.getIn(['myTrade', 'address', 'city', 'all']),
})

export default connect(mapStateToProps)(CityListPage)
