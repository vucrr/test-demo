import { ListView } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import HeaderTab from './HeaderTab'
import RepairCell, { Empty, Footer } from './RepairCell'

const mocks = [1, 2, 3, 4, 5, 6]

const headerProps = {
  rightContentType: 'tabBar',
}

const containerProps = {
  renderHeader: <Header {...headerProps}>售后维修</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

class RepairList extends React.Component {
  readonly state = {
    ds: new ListView.DataSource({
      rowHasChanged: (r1: any, r2: any) => r1 !== r2,
    }),
    loading: true,
    empty: false,
  }

  componentDidMount() {
    this.setState({
      ds: this.state.ds.cloneWithRows(mocks),
    })
  }

  renderRow = (item: any) => <RepairCell key={item} />

  renderFooter = () => <Footer loading={this.state.loading} />

  onEndReached = () => {
    this.setState({
      loading: false,
    })
  }

  renderList() {
    if (this.state.empty) return <Empty />
    return (
      <ListView
        useBodyScroll={true}
        dataSource={this.state.ds}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        onEndReached={this.onEndReached}
      />
    )
  }

  render() {
    return (
      <Container {...containerProps}>
        <HeaderTab active="left" />
        {this.renderList()}
      </Container>
    )
  }
}

export default connect()(RepairList)
