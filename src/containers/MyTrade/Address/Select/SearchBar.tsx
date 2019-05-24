import { Flex, Icon, SearchBar } from 'antd-mobile'
import classnames from 'classnames'
import { Link } from 'components'
import debounce from 'lodash.debounce'
import React from 'react'
import styles from './SearchBar.less'

export interface SearchBoxProps {
  city: any
  onchangeSearch: Function
  count: number
  onhandleCityDetail: Function
  handleClick: Function
  changekeyword: Function
  url: {
    query: {
      city: string
      redirect: string
    }
  }
}

export interface SearchBoxState {
  showTips: boolean
  value: any
  cityLink: string
}

const cityLink = '/mytrade/address/city-list'

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
  constructor(props: SearchBoxProps) {
    super(props)
    this.state = {
      showTips: false,
      value: '',
      cityLink: props.url.query.redirect
        ? `${cityLink}?redirect=${encodeURIComponent(props.url.query.redirect)}`
        : cityLink,
    }
    this.handleChange = debounce(this.handleChange, 600)
  }

  handleChange = (value: string) => {
    if (value) {
      this.setState({
        value,
      })
      this.props.onchangeSearch(this.props.city, value)
      this.props.changekeyword(value)
      this.toggleTips(true)
    } else {
      this.toggleTips(false)
    }
  }

  toggleTips = (status: boolean) => {
    this.setState({ showTips: status })
  }
  baocun = async () => {
    const result = await this.props.onhandleCityDetail(this.props.city, '', true)
    const mapAddressInfo = {
      province: result.geocodes[0].addressComponent.province,
      city: this.props.city,
      area: result.geocodes[0].addressComponent.district,
      longitude: result.geocodes[0].location.lng,
      lat: result.geocodes[0].location.lat,
      detail_address: this.state.value,
      address: '',
    }
    this.props.handleClick(mapAddressInfo)
  }
  render() {
    const { showTips, cityLink } = this.state
    const searchBarProps = {
      className: styles.search_bar,
      placeholder: '请输入您想要查找的准确地址',
      onChange: this.handleChange,
      onClear: () => {
        this.props.onchangeSearch(this.props.city, this.props.city)
        this.toggleTips(false)
      },
    }

    return (
      <Flex className={styles.searchBar}>
        <Link to={cityLink} className={styles.cityWrap}>
          <span>{this.props.city}</span>
          <Icon type="down" size="xs" color="#999" className={styles.iconDown} />
        </Link>
        <Flex.Item className={styles.searchWrap}>
          <SearchBar {...searchBarProps} />
          <div className={classnames(styles.tips_box, this.props.count === -1 && showTips && styles.active)}>
            <span onClick={this.baocun}>使用这个地点作为收货地址</span>
          </div>
        </Flex.Item>
      </Flex>
    )
  }
}

export default SearchBox
