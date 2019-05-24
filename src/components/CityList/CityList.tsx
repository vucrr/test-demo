import { List, ListView } from 'antd-mobile'
import React from 'react'
import styles from './CityList.less'

const Item = List.Item
const IndexedList = ListView.IndexedList

interface Cities {
  [index: string]: { label: string; value: string }[]
}

function genData(ds: any, provinceData: Cities) {
  const dataBlob: { [index: string]: string } = {}
  const sectionIDs: string[] = []
  const rowIDs: string[][] = []
  Object.keys(provinceData).forEach((item: string, index: number) => {
    sectionIDs.push(item)
    dataBlob[item] = item
    rowIDs[index] = []

    provinceData[item].forEach(city => {
      rowIDs[index].push(city.value)
      dataBlob[city.value] = city.label
    })
  })
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
}

interface CityListProps {
  list: Cities
  onClickItem: (city: string) => void
  renderHeader: () => React.ReactElement<any>
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

  componentWillMount() {
    this.setState({
      dataSource: genData(this.state.dataSource, this.props.list),
      isLoading: false,
    })
  }

  onClickItem = (city: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    this.props.onClickItem(city)
  }

  render() {
    if (this.state.isLoading) {
      return null
    }

    return (
      <div className={styles.cityListWrapper}>
        <IndexedList
          dataSource={this.state.dataSource}
          useBodyScroll={true}
          renderSectionHeader={sectionData => <span>{sectionData}</span>}
          renderRow={rowData => <Item onClick={this.onClickItem(rowData)}>{rowData}</Item>}
          renderHeader={this.props.renderHeader}
        />
      </div>
    )
  }
}

export default CityList
