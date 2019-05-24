import { clickStoreItem, repairQualitySelectActions } from 'actions/myTrade/guangzhou'
import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { Icon, ListView } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './StoreDetail.less'

interface ListProps {
  storeList: any[]
  totalCount: number
  fetchList: Function
  pageIndex: number
  query: any
  selectEvent: any
  onClickStoreItem: any
}

class StoreDetail extends React.Component<ListProps> {
  onClickItem = (storeCode: string) => {
    this.props.selectEvent(storeCode)
    this.props.onClickStoreItem(storeCode)
  }

  render() {
    const renderRow = (item: any, id: string | number) => {
      return (
        <div className={classnames(styles.store_detail, item.operating_state !== 1 && styles.none)} key={id}>
          <Flex justify="between" onClick={() => this.onClickItem(item.store_code)}>
            {item.selected ? (
              <Icon type={require('svg/xuanzhong.svg')} className={styles.ball_icon} />
            ) : (
              <div className={styles.ball} />
            )}
            <div className={styles.store_con}>
              <h3 className={styles.store_name}>{item.store_name}</h3>
              <p>{item.store_address}</p>
            </div>
          </Flex>
        </div>
      )
    }
    const { storeList, totalCount, fetchList, query } = this.props
    let { pageIndex } = this.props
    const viewListProps = {
      dataSource: storeList,
      hasMore: storeList.length < totalCount,
      Row: (item: any, _: any, rowId: string | number) => renderRow(item, rowId),
      className: styles.storeDetailList,
      pageSize: 5,
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
      queryMoreList() {
        const mergedQuery = {
          page_index: ++pageIndex,
          ...query,
        }
        fetchList({ query: mergedQuery }, true)
      },
    }
    if (totalCount === 0) {
      return <div className={styles.bottom}>- 该地区暂无可以选择的门店 -</div>
    }

    return <ListView {...viewListProps} />
  }
}
const mapStateToProps = (state: any) => ({
  storeList: state.getIn(['myTrade', 'canton', 'store', 'store_list']).toJS(),
  totalCount: state.getIn(['myTrade', 'canton', 'store', 'total_count']),
  pageIndex: state.getIn(['myTrade', 'canton', 'store', 'page_index']),
})

const mapDispatchToProps = (dispatch: any) => ({
  fetchList: bindActionCreators(repairQualitySelectActions, dispatch),
  onClickStoreItem: bindActionCreators(clickStoreItem, dispatch),
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StoreDetail as any) as React.ReactType
