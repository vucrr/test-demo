import { Flex, ListView } from 'antd-mobile'
import { Icon } from 'components'
import React, { Component } from 'react'
import styles from './ListView.less'

interface MyListViewProps {
  dataSource: any
  hasMore: boolean
  hasMoreMsg?: string
  className: string
  pageSize?: number
  rowHasChanged?(row1: any, row2: any): void
  queryMoreList: Function
  Header?: () => React.ReactElement<any>
  Row: (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean,
  ) => React.ReactElement<any>
}

interface MyListViewState {
  dataSource: any
  isLoading: boolean
}

class MyListView extends Component<MyListViewProps, MyListViewState> {
  static defaultProps = {
    pageSize: 10,
    hasMoreMsg: '没有更多了哦',
    rowHasChanged: (row1: any, row2: any) => row1.id !== row2.id,
  }
  readonly state = {
    isLoading: true,
    dataSource: new ListView.DataSource({
      rowHasChanged: this.props.rowHasChanged,
    }),
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.dataSource),
      isLoading: false,
    })
  }

  componentWillReceiveProps(nextProps: MyListViewProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      })
    }
  }

  onEndReached = () => {
    if (this.state.isLoading || !this.props.hasMore) {
      return
    }
    if (this.props.hasMore) {
      this.setState({ isLoading: true })
      this.props.queryMoreList()
    }
  }

  renderFooter = () => {
    const { isLoading } = this.state
    const { hasMore, hasMoreMsg } = this.props
    if (!hasMoreMsg!.length) {
      return <></>
    }
    const message = hasMore ? '· 上拉加载更多 ·' : `· ${hasMoreMsg} ·`
    return (
      <Flex className={styles.loading_box} justify="center">
        {isLoading ? (
          <Flex align="center" justify="center">
            <Icon className={styles.icon} type={require('svg/spinner.svg')} />正在加载中...
          </Flex>
        ) : (
          message
        )}
      </Flex>
    )
  }

  render() {
    const { Header, Row, className, pageSize } = this.props
    const { dataSource } = this.state

    return (
      <ListView
        dataSource={dataSource}
        renderHeader={Header}
        renderFooter={this.renderFooter}
        renderRow={Row}
        className={className}
        initialListSize={pageSize}
        pageSize={pageSize}
        useBodyScroll={true}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={100}
      />
    )
  }
}

export default MyListView
