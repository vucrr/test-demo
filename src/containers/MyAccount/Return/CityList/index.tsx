import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { listCities } from 'actions/myAccount/returnPhone'
import { List, ListView } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import TopBar from './TopBar'
import styles from './index.less'

const containerProps = {
  renderHeader: <Header>选择城市</Header>,
  renderTabBar: <TabBar hidden={true} />,
}

const IndexedList = ListView.IndexedList

const { Item } = List

interface City {
  label: string
  value: string
}

type Citys = {
  [index: string]: City[]
}

function genData(ds: any, provinceData: Citys) {
  const dataBlob: { [index: string]: City | string } = {}
  const sectionIDs: string[] = []
  const rowIDs: string[][] = []
  Object.keys(provinceData).forEach((item: string, index: number) => {
    sectionIDs.push(item)
    dataBlob[item] = item
    rowIDs[index] = []

    provinceData[item].forEach(city => {
      rowIDs[index].push(city.value)
      dataBlob[city.value] = city
    })
  })

  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
}

interface CityListProps {
  cityList: any
  hot: any
  error: any
  url: any
}

interface CityListState {
  dataSource: unknown
  isLoading: boolean
}

class CityList extends React.Component<CityListProps, CityListState> {
  constructor(props: CityListProps) {
    super(props)
    const getSectionData = (dataBlob: { [index: string]: string }, sectionID: string) => dataBlob[sectionID]
    const getRowData = (dataBlob: { [index: string]: string }, _: string, rowID: string) => dataBlob[rowID]

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1: string, row2: string) => row1 !== row2,
      sectionHeaderHasChanged: (s1: string, s2: string) => s1 !== s2,
    })

    this.state = {
      dataSource,
      isLoading: true,
    }
  }

  static async getInitialProps({ store, isServer, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      const res = await store.dispatch(listCities(req))
      if (res.status) {
        return { error: res }
      }
    }
  }

  componentWillMount() {
    this.setState({
      dataSource: genData(this.state.dataSource, this.props.cityList.toJS()),
      isLoading: false,
    })
  }

  renderHeader() {
    const city = this.props.hot.toJS()
    return (
      <div className={styles.topWrapper}>
        <span>已开通城市</span>
        <div className={styles.wrapper}>
          {city.map((item: City, index: number) => (
            <div className={styles.tag} key={index} onClick={this.forward(item)}>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    )
  }

  forward = (row: City) => async () => {
    const {
      url: { query },
    } = this.props
    const redirect = query.redirect ? { redirect: query.redirect } : null
    await Router.push({
      pathname: '/myaccount/return/storelist',
      query: {
        ...Router.router!.query,
        city_id: row.value,
        city_name: encodeURIComponent(row.label),
        ...redirect,
      },
    })
  }

  render() {
    const { error } = this.props
    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    return (
      <Container {...containerProps}>
        <TopBar />
        <div className={styles.listWrapper}>
          <IndexedList
            dataSource={this.state.dataSource}
            useBodyScroll={true}
            renderSectionHeader={sectionData => <span>{sectionData}</span>}
            renderRow={rowData => <Item onClick={this.forward(rowData)}>{rowData.label}</Item>}
            renderHeader={() => this.renderHeader()}
          />
        </div>
      </Container>
    )
  }
}

const mapState = (state: any) => ({
  cityList: state.getIn(['myAccount', 'returnPhone', 'city', 'list']),
  hot: state.getIn(['myAccount', 'returnPhone', 'city', 'hot']),
})

export default connect(mapState)(CityList)
