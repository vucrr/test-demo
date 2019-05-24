import { repairStandbyRecordActions } from 'actions/myAccount/repair/standby'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Link, ListView } from 'components'
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Record.less'

const Row = (item: any, index: string | number) => {
  // const status = ['待支付','待发货','已发货','待还机','已质检','用户确认','待退款']
  return (
    <div className={styles.record} key={index}>
      <Flex className={styles.rowTit} justify="between">
        <p className={styles.main_tit}>{item.sku_name}</p>
        <span className={classnames(!item.is_done && styles.status)}>{item.status_name}</span>
      </Flex>
      <div className={styles.rowIntroduce}>
        <Flex justify="between">
          备用机单号：<span>{item.sn}</span>
        </Flex>
        <Flex justify="between">
          创建时间：<span>{item.dt_created}</span>
        </Flex>
        <Flex justify="between">
          押金：<span>{item.deposit / 100}元</span>
        </Flex>
      </div>
      <Link to={'standby-detail?sn=' + item.sn} className={styles.link}>
        查看详情
      </Link>
    </div>
  )
}

interface ListProps {
  record: any
  count: number
  fetchList: Function
  page: number
  query: any
}

const RecordList = ({ record, count, fetchList, page, query }: ListProps) => {
  const viewListProps = {
    dataSource: record,
    hasMore: record.length < count,
    Row,
    className: styles.recordList,
    pageSize: 5,
    queryMoreList() {
      const querys = {
        page: ++page,
        ...query,
      }
      fetchList({ query: querys }, true)
    },
  }
  if (count === 0) {
    return <div className={styles.bottom}>- 您还没有备用机记录 -</div>
  }

  return <ListView {...viewListProps} />
}
const mapStateToProps = (state: any) => ({
  record: state.getIn(['myAccount', 'repair', 'standby', 'data']).toJS(),
  count: state.getIn(['myAccount', 'repair', 'standby', 'count']),
  page: state.getIn(['myAccount', 'repair', 'standby', 'page']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchList: bindActionCreators(repairStandbyRecordActions, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordList as any) as React.ReactType
