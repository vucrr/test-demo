import { repairQualityRecordActions } from 'actions/myAccount/repair/quality'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Copy, Icon, Link, ListView } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './Record.less'

const Row = (item: any, index: string | number) => {
  const state = item.status_desc === '维修中'
  const to = 'quality-detail?sn=' + item.sn
  return (
    <div className={classnames(styles.record, !state && styles.done)} key={index}>
      <Flex justify="between" className={styles.record_title}>
        <h4>{item.sn}</h4>
        <span className={styles.record_state}>
          {item.status_desc}
          {state && (
            <Link to={to}>
              <Icon type={require('svg/arrow-right.svg')} className={styles.icon} />
            </Link>
          )}
        </span>
      </Flex>
      <div className={styles.record_detail}>
        <p>
          <span className={styles.record_topic}>申请时间：</span>
          {item.dt_created}
        </p>
        <Flex align="start" className={styles.quer}>
          <Flex justify="between" className={styles.record_topic}>
            问<span>题：</span>
          </Flex>
          {item.desc}
        </Flex>
        {item.status_desc === '已完成' && (
          <div>
            <p className={styles.quer}>
              <span className={styles.record_topic}>寄回物流：</span>
              {item.carrier_name}快递
            </p>
            <Flex className={styles.quer}>
              <span className={styles.record_topic}>物流单号：</span>
              <p>
                {item.tracking_number}
                <Copy text={item.tracking_number}>
                  <span className={styles.copy_ok}>复制</span>
                </Copy>
              </p>
            </Flex>
          </div>
        )}
      </div>
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
    pageSize: 6,
    queryMoreList() {
      const querys = {
        page: ++page,
        ...query,
      }
      fetchList({ query: querys }, true)
    },
  }
  if (count === 0) {
    return <div className={styles.bottom}>- 您还没有交易记录 -</div>
  }

  return <ListView {...viewListProps} />
}
const mapStateToProps = (state: any) => ({
  record: state.getIn(['myAccount', 'repair', 'quality', 'data']).toJS(),
  count: state.getIn(['myAccount', 'repair', 'quality', 'count']),
  page: state.getIn(['myAccount', 'repair', 'quality', 'page']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchList: bindActionCreators(repairQualityRecordActions, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecordList as any) as React.ReactType
