import { Flex } from 'antd-mobile'
import { Icon } from 'components'
import Router from 'next/router'
import React from 'react'
import Geo from 'utils/geo'
import styles from './TopBar.less'

enum MSG {
  Loading = '定位中...',
  Fail = '定位失败',
}

export const forward = async (city: string, query?: any) => {
  if (city === MSG.Loading || city === MSG.Fail || !city) return
  const redirect = query.redirect ? { redirect: query.redirect } : {}
  await Router.push({ pathname: '/mytrade/address/select', query: { city, ...redirect } })
}

interface TopBarProps {
  query: any
}
class TopBar extends React.Component<TopBarProps> {
  state = {
    msg: MSG.Loading,
  }

  async componentDidMount() {
    await this.loadLocation()
  }

  loadLocation = async () => {
    this.setState({ msg: MSG.Loading })
    try {
      await Geo.load()
      const city = (await Geo.city) || MSG.Fail
      this.setState({ msg: city })
    } catch (e) {
      this.setState({ msg: MSG.Fail })
    }
  }

  get isLoading() {
    return this.state.msg === MSG.Loading
  }

  render() {
    return (
      <Flex align="center" justify="between" className={styles.container} disabled={this.isLoading}>
        <Flex className={styles.location} onClick={() => forward(this.state.msg, this.props.query)}>
          {this.state.msg}
        </Flex>
        <Flex
          align="center"
          className={this.isLoading ? styles.relocateLoading : styles.relocate}
          onClick={this.loadLocation}
        >
          <Icon type={require('svg/locate.svg')} />
          <span>重新定位</span>
        </Flex>
      </Flex>
    )
  }
}

export default TopBar
