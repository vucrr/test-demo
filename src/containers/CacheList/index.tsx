import { NextSFC2 } from '@@types/next'
import * as cacheListActions from 'actions/cache-list'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { noop } from 'utils/tools'
import CacheList from './CacheList'

interface CacheListHomeProps {
  cacheList: any
  onCacheListActions: any
}

const CacheListHome: NextSFC2<CacheListHomeProps> = ({ cacheList, onCacheListActions }) => {
  const headerProps = {
    icon: '',
    onLeftClick: noop,
  }

  const containerProps = {
    renderHeader: <Header {...headerProps}>缓存管理</Header>,
    renderTabBar: <TabBar hidden={true} />,
  }

  const cacheListProps = {
    list: cacheList.get('list'),
    onCacheListActions,
  }

  return (
    <Container {...containerProps}>
      <CacheList {...cacheListProps} />
    </Container>
  )
}

CacheListHome.getInitialProps = async ({ store }) => {
  await store.dispatch(cacheListActions.fetchList())
}

const mapStateToProps = (state: any) => ({
  cacheList: state.get('cacheList'),
})

const mapDispatchToProps = (dispatch: any) => ({
  onCacheListActions: bindActionCreators(cacheListActions, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CacheListHome)
