import { Icon, Link, ListView } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { ServiceListItem, ServiceListReturns } from 'interfaces/account/service/list'
import React from 'react'
import styles from './List.less'
import ListItem from './ListItem'

export interface ListProps {
  status?: '1' | '2'
  list: ServiceListReturns
  page: number
  hasMore: boolean
  onServiceActions: any
}

const List: React.FunctionComponent<ListProps> = ({ status, list, page, hasMore, onServiceActions }) => {
  const viewListProps = {
    pageSize: 20,
    dataSource: list,
    hasMore, // info.get('has_more'),
    hasMoreMsg: status !== '2' ? '' : '没有更多了哦',
    Row: (item: ServiceListItem) => (
      <ListItem item={item} onServiceActions={onServiceActions} key={item.contract_no} status={status} />
    ),
    className: styles.container,
    rowHasChanged: (row1: ServiceListItem, row2: ServiceListItem) => row1.contract_no !== row2.contract_no,
    queryMoreList() {
      const query = {
        status: status,
        page: ++page,
        limit: 20,
      }
      onServiceActions.fetchList(query, true)
    },
  }

  return (
    <div className={styles.list}>
      <ListView {...viewListProps} />
      {!hasMore &&
        status !== '2' && (
          <div className={styles.bottom_box}>
            <Link
              className={styles.link}
              to="/myaccount/service/list?status=2"
              trackEvent={TrackEventMyCenter.HistoricalOrder}
            >
              历史服务 <Icon type="right" />
            </Link>
          </div>
        )}
    </div>
  )
}

export default List
