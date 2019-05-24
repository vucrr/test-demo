import { GetInitialPropsContext } from '@@types/next'
import { fetchInfo } from 'actions/activitys/guide-old-user'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React from 'react'
import { connect } from 'react-redux'
import Bottom from './Bottom'
import Buyout from './Buyout'
import Exchangeways from './Exchangeways'
import HeaderAnimate from './HeaderAnimate'
import Recommend from './Recommend'
import Renewal from './Renewal'
import styles from './index.less'

interface GuideOldUserProps extends ErrorObject {
  showHour: boolean
  day: any
  hour: any
  showExpired: boolean
  product_name: string
  guideOldUser: any
}

class GuideOldUser extends React.Component<GuideOldUserProps> {
  static getInitialProps = async ({ store, query, req }: GetInitialPropsContext) => {
    const data = await store.dispatch(fetchInfo({ query, req }))
    if (data.status) {
      return { error: data }
    }
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const containerProps = {
      renderHeader: <Header hidden={true}>租机到期方案</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps} className={styles.guideOldUser}>
        <HeaderAnimate
          showHour={this.props.guideOldUser.get('showHour')}
          day={this.props.guideOldUser.get('day')}
          hour={this.props.guideOldUser.get('hour')}
          showExpired={this.props.guideOldUser.get('showExpired')}
          product_name={this.props.guideOldUser.get('product_name')}
        />
        <Recommend />
        <Exchangeways />
        <Renewal />
        <Buyout />
        <Bottom />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  guideOldUser: state.getIn(['activitys', 'guideOldUser']),
})

export default connect(mapStateToProps)(GuideOldUser)
