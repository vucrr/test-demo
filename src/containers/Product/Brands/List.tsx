import { Tabs } from 'antd-mobile'
import classnames from 'classnames'
import { TrackEventBrand } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import { trackClickEvent } from 'utils/piwik'
import { Query } from '.'
import Item from './Item'
import styles from './List.less'

export interface ListProps {
  tags: any
  products: any
  query: Query
}

export interface ListState {
  headerHeight: number
}

interface Tab {
  key?: string
  title: React.ReactNode
  [key: string]: any
}

class List extends React.Component<ListProps, ListState> {
  static defaultProps = {
    tag: '1',
  }

  readonly state: Readonly<ListState> = {
    headerHeight: 45,
  }

  componentDidMount() {
    const headerHeight =
      (document.querySelector('#fixedHeader .am-navbar') &&
        document.querySelector('#fixedHeader .am-navbar')!.clientHeight) ||
      0
    this.setState({ headerHeight })
  }

  renderTabBar = (props: any) => {
    return (
      <Sticky topOffset={-this.state.headerHeight}>
        {({ style }) => (
          <div className={styles.tab_box} style={style}>
            <Tabs.DefaultTabBar {...props} page={4.8} />
          </div>
        )}
      </Sticky>
    )
  }

  render() {
    const { query, tags, products } = this.props

    const tabsProps = {
      tabs: tags.map((item: any) => ({ tag: item.get('tag_id'), title: item.get('tag_name') })).toJS(),
      page: tags.findIndex((item: any) => item.get('tag_id').toString() === query.tag_id) || 0,
      // tabBarActiveTextColor: '#ff5544',
      tabBarUnderlineStyle: { border: '1px solid #ff5544' }, // tabBar下划线样式
      onChange: async (tab: Tab) => {
        const to = `/product/brands?brand_id=${query.brand_id}&tag_id=${tab.tag}`
        await Router.replace(to)
        trackClickEvent({
          label: `${TrackEventBrand.Tab.BrandPageHengF}\t${query.brand_id}\t${tab.tag}`,
          category: TrackEventBrand.Category,
        })
      },
    }

    const showTab = tags.size > 1

    return (
      <StickyContainer className={styles.container}>
        {showTab && <Tabs {...tabsProps} renderTabBar={this.renderTabBar} />}
        <div className={classnames(styles.product_box, !showTab && styles.hide_tab)}>
          <div className={styles.list}>{products.map((item: any, key: number) => <Item key={key} item={item} />)}</div>
          <p className={styles.footer}>·已经到底了哦·</p>
        </div>
      </StickyContainer>
    )
  }
}

export default List
