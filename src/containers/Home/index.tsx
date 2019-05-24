import { GetInitialPropsContext } from '@@types/next'
import * as homeActions from 'actions/home'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookies from 'utils/cookies'
import { getDomain, noop } from 'utils/tools'
import OrderTips from '../Product/Category/OrderTips'
import ActivityList from './ActivityList'
import AdvertModal from './AdvertModal'
import BottomBox from './BottomBox'
import Brands from './Brands'
import Coupons from './Coupons'
import HeaderSwiper from './HeaderSwiper'
import HotActivity from './HotActivity'
import RecommendSwiper from './RecommendSwiper'
import TopDownLoad from './TopDownLoad'

interface HomeProps extends ErrorObject {
  home: any
  brand: string
  hideOwnBrand: boolean
  utm: any
  query: any
  onHomeActions: any
}

class Home extends React.Component<HomeProps> {
  static defaultProps = {
    brand: '享换机',
  }

  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    const data = await store.dispatch(homeActions.fetchInfo({ query, req }))
    if (data.status) {
      return { error: data }
    }
  }

  componentDidMount() {
    const { home } = this.props
    if (home.get('userInfo')) {
      const expires = new Date(new Date().setHours(24, 0, 0, 0))
      const domain = getDomain(location.hostname)
      const userToken = home.getIn(['userInfo', 'userToken'])
      const userId = home.getIn(['userInfo', 'user_id_v2'])

      cookies.set('userToken', userToken, { expires, domain })
      cookies.set('user_id_v2', userId, { expires, domain })
    }
  }

  render() {
    const { error, query, home, onHomeActions } = this.props

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      icon: '',
      hidden: true,
      // backTop: true,
      onLeftClick: noop,
      rightContent: '',
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>{this.props.brand}</Header>,
      renderTabBar: <TabBar selectedTab="home" />,
      fixedTabBar: true,
      bgColor: '#fff',
    }

    const popup = home.get('popup')

    return (
      <Container {...containerProps}>
        <TopDownLoad query={query} />
        <HeaderSwiper
          festival={home.get('festival')}
          brand={home.getIn(['brand', 'model_data'])}
          list={home.getIn(['banner', 'model_data'])}
          brands={home.getIn(['brand_endorsement', 'model_data'])}
        />
        <Brands list={home.getIn(['icons', 'model_data'])} />
        <Coupons info={home.get('userTag')} fetchList={onHomeActions.fetchUserTag} />
        <HotActivity
          title={home.getIn(['three_palace', 'model_title'])}
          list={home.getIn(['three_palace', 'model_data'])}
        />
        <RecommendSwiper
          title={home.getIn(['recommend', 'model_title'])}
          list={home.getIn(['recommend', 'model_data'])}
        />
        <ActivityList title={home.getIn(['subject', 'model_title'])} list={home.getIn(['subject', 'model_data'])} />
        <BottomBox
          title={home.getIn(['brand_story', 'model_title'])}
          list={home.getIn(['brand_story', 'model_data'])}
        />
        {!!popup && !!popup.get('id') && <AdvertModal popup={popup} />}
        <OrderTips />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  home: state.get('home'),
  brand: state.getIn(['serverApp', 'utm', 'brand']),
})

const mapDispatchToProps = (dispatch: any) => ({
  onHomeActions: bindActionCreators(homeActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
