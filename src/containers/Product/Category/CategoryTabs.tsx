import { Tabs } from 'antd-mobile'
import { TrackEventCategory } from 'configs/trackEventLabels'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './CategoryTabs.less'

interface CategoryTabsProps {
  tag?: string
  brand?: any
  list: any
}

interface Tab {
  key?: string
  title: React.ReactNode
  [key: string]: any
}

const CategoryTabs = ({ list, brand, tag = '1' }: CategoryTabsProps) => {
  const tabs = list.map((item: any) => ({ tag: item.get('tag_id'), title: item.get('tag_name') })).toJS()

  const tabProps = {
    tabs,
    page: list.findIndex((item: any) => item.get('tag_id').toString() === tag),
    renderTabBar: (props: any) => <Tabs.DefaultTabBar {...props} page={4.8} />,
    // tabBarActiveTextColor: '#ff5544', // tabBar激活Tab文字颜色
    tabBarUnderlineStyle: { border: '1px solid #ff5544' }, // tabBar下划线样式
    async onChange(tab: Tab) {
      const to = tab.tag > 1 ? `/product/category?tag_id=${tab.tag}` : '/product/category'
      trackClickEvent({
        category: TrackEventCategory.Category,
        label: `${TrackEventCategory.Tabs.CategoryHengF}\t${tab.tag}`,
      })
      await Router.replace(to)
      window.scrollTo(0, 0)
    },
  }

  return (
    <div className={styles.tabs_box}>
      <div className={styles.title_box}>
        <span className={styles.title}>{brand.get('name')}</span>
        <span className={styles.sub_title}>{brand.get('positioning')}</span>
      </div>
      <Tabs {...tabProps} />
    </div>
  )
}

export default CategoryTabs
