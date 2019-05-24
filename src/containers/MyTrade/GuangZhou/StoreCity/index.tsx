import { GetInitialPropsContext } from '@@types/next'
import { repairQualityCityActions } from 'actions/myTrade/guangzhou'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import CityList from './CityList'
import styles from './index.less'

class City extends React.Component<{ city: any; error: any }> {
  static async getInitialProps({ store, query, req }: GetInitialPropsContext) {
    if (query.operator_channel) {
      await store.dispatch(repairQualityCityActions({ query, req }))
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }

  render() {
    const { city, error } = this.props
    if (city.get('errorMsg')) {
      return <Error statusCode={city.get('status')} errorMsg={city.get('errorMsg')} />
    } else if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const containerProps = {
      renderHeader: <Header> 选择城市 </Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <h2 className={styles.City_tit}>请选择您所在城市</h2>
        <CityList city={city} />
      </Container>
    )
  }
}
const mapStateToProps = (state: any) => ({
  city: state.getIn(['myTrade', 'canton', 'store', 'city']),
})
export default connect(mapStateToProps)(City)
