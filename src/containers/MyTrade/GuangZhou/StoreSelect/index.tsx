import { GetInitialPropsContext } from '@@types/next'
import { repairQualitySelectActions } from 'actions/myTrade/guangzhou'
import { Button, Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import StoreDetail from './StoreDetail'
import styles from './index.less'

class SelectStore extends React.Component<
  { select: any; url: any; city: any; error: any },
  { storeCode: any; stateCity: string }
> {
  static async getInitialProps({ store, req, query }: GetInitialPropsContext) {
    if (query.city_id && query.city) {
      await store.dispatch(repairQualitySelectActions({ query, req }))
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }
  readonly state = {
    storeCode: '',
    stateCity: '',
  }

  selectEvent = (storeCode: any) => {
    if (storeCode === this.state.storeCode) {
      this.setState({
        storeCode: '',
      })
    } else {
      this.setState({
        storeCode,
      })
    }
  }

  handleSubmit = async () => {
    Cookies.set('store_code', this.state.storeCode, { expires: 7 })
    await Router.push({
      pathname: '/mytrade/canton/store-details',
      query: { store_code: this.state.storeCode, utm_source: 'gzyd' },
    })
  }
  render() {
    const {
      select,
      url: { query },
      error,
    } = this.props

    if (select.get('errorMsg')) {
      return <Error statusCode={select.get('status')} errorMsg={select.get('errorMsg')} />
    } else if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const containerProps = {
      renderHeader: <Header> 选择门店 </Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <h2 className={styles.store_tit}>
          <span>{query.city}</span>(已选城市)
        </h2>
        <StoreDetail selectEvent={this.selectEvent} select={select} query={query} />
        <Button
          className={styles.store_btn}
          type="warning"
          disabled={this.state.storeCode === ''}
          onClick={this.handleSubmit}
        >
          确定
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  select: state.getIn(['myTrade', 'canton', 'store', 'store_list']),
  city: state.getIn(['myTrade', 'canton', 'store', 'city']),
})
export default connect(mapStateToProps)(SelectStore)
