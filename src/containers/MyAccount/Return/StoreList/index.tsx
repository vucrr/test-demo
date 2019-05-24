import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import {
  clearChosenStore,
  clearStoreList,
  listCityRegions,
  listStore,
  selectStore,
} from 'actions/myAccount/returnPhone'
import classnames from 'classnames'
import { Container, Header, Icon, TabBar } from 'components'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Empty from './Empty'
import StoreItem from './StoreItem'
import Tabs from './Tabs'
import styles from './index.less'

const Selected = (props: { name: string }) => {
  if (!props.name) return null
  return (
    <div className={styles.selected}>
      <Icon size="xxs" type={require('svg/right-circle.svg')} />
      <span>您已选择 {props.name}</span>
    </div>
  )
}

interface StoreListProps {
  region: any
  store: any
  listStore: Function
  selectStore: Function
  clearChosenStore: Function
  url: {
    query: any
  }
  isQsy: boolean
}

class StoreList extends React.Component<StoreListProps> {
  static async getInitialProps({ store, isServer, res, asPath, query, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const cityId = query.city_id as string
      const data = await store.dispatch(listCityRegions(cityId, req))
      if (data.length > 0) {
        const regionId = query.region_id || data[0].city_id
        const storeId = query.store_id as string
        await store.dispatch(listStore(cityId, regionId, storeId, req))
      } else {
        store.dispatch(clearStoreList())
      }
    }
  }

  get isEmpty() {
    return this.props.store.size <= 0
  }

  handleClickHeader = async () => {
    this.props.clearChosenStore()
    const {
      url: { query },
    } = this.props
    const redirect = query.redirect ? { redirect: query.redirect } : null
    await Router.push({
      pathname: '/myaccount/return/citylist',
      query: {
        trade_no: query.trade_no,
        ...redirect,
      },
    })
  }

  containerProps = {
    renderHeader: (
      <div className={styles.headerContainer} onClick={this.handleClickHeader}>
        <Header>选择门店</Header>
        <span className={classnames(styles.sub, !this.props.isQsy && styles.xhj_sub)}>
          {decodeURIComponent(this.props.url.query.city_name)}
          <Icon className={styles.headerIcon} size="xxs" type={require('svg/arrow-left.svg')} />
        </span>
      </div>
    ),
    renderTabBar: <TabBar hidden={true} />,
  }

  onChange = async (tab: any) => {
    const cityId = this.props.url.query.city_id
    const regionId = tab.value
    await this.props.listStore(cityId, regionId, '')
  }

  handleSelectStore = async (item: any) => {
    const index = this.props.store.indexOf(item)
    this.props.selectStore(index)
    if (this.props.url.query.exchange) {
      await Router.push({
        pathname: '/mytrade/exchange/return',
        query: {
          old_trade_no: this.props.url.query.trade_no,
          store_id: item.get('store_id'),
          region_id: item.get('region_id'),
        },
      })
    } else if (this.props.url.query.redirect) {
      const { redirect, city_name } = this.props.url.query
      try {
        const decodeUrl = decodeURIComponent(redirect)
        const urlQuery = `store_id=${item.get('store_id')}&region_id=${item.get('region_id')}&city_name=${city_name}`
        const redirectUrl = decodeUrl.indexOf('?') > 0 ? `${decodeUrl}&${urlQuery}` : `${decodeUrl}?${urlQuery}`
        await Router.push(redirectUrl)
      } catch (err) {
        console.log(err)
      }
    } else {
      await Router.push({
        pathname: '/myaccount/return',
        query: {
          ...this.props.url.query,
          store_id: item.get('store_id'),
          region_id: item.get('region_id'),
        },
      })
    }
  }

  render() {
    const {
      query: { store_id: storeId, region_id: regionId },
    } = this.props.url
    if (this.isEmpty) {
      return (
        <Container {...this.containerProps}>
          <Empty tradeNo={this.props.url.query.trade_no} isQsy={this.props.isQsy} />
        </Container>
      )
    }
    const tabs = this.props.region.toJS().map((region: any) => ({
      title: region.city_name,
      value: region.city_id,
    }))
    let index = regionId ? tabs.findIndex((tab: any) => tab.value === parseInt(regionId, 10)) : 0
    if (index === -1) index = 0
    let name = ''
    if (storeId) {
      const store = this.props.store.find((s: any) => s.get('store_id') === parseInt(storeId, 10))
      name = store.get('store_name')
    }
    return (
      <Container {...this.containerProps}>
        {!this.isEmpty && <Tabs tabs={tabs} onChange={this.onChange} index={index} isQsy={this.props.isQsy} />}
        <div className={classnames(styles.contentWrapper, this.isEmpty && styles.empty)}>
          <div className={styles.content}>
            {this.props.store.map((item: any) => (
              <StoreItem key={item.get('store_id')} item={item} onClick={this.handleSelectStore} />
            ))}
          </div>
        </div>
        {storeId && <Selected name={name} />}
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isQsy: state.getIn(['serverApp', 'utm', 'isQsy']),
  region: state.getIn(['myAccount', 'returnPhone', 'city', 'region']),
  store: state.getIn(['myAccount', 'returnPhone', 'city', 'store']),
})

const mapDispatch = (dispatch: any) => ({
  listStore: bindActionCreators(listStore, dispatch),
  selectStore: bindActionCreators(selectStore, dispatch),
  clearChosenStore: bindActionCreators(clearChosenStore, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatch,
)(StoreList)
