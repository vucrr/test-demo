import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import Router from 'next/router'
import React from 'react'
import styles from './CityList.less'

class CityList extends React.Component<{ city: any }, { num: number }> {
  readonly state = {
    num: 999999,
  }

  toLink = async (id: number, city: string) => {
    this.setState({
      num: id,
    })
    await Router.push({
      pathname: '/mytrade/canton/store-select',
      query: {
        utm_source: 'gzyd',
        city,
        city_id: id,
      },
    })
  }
  render() {
    const { city } = this.props
    return (
      <div className={styles.city_list}>
        <Flex wrap="wrap">
          {city.map((item: any, index: number) => {
            return (
              <div
                onClick={() => this.toLink(item.get('city_id'), item.get('city_name'))}
                key={index}
                className={classnames(
                  styles.list_item,
                  this.state.num === item.get('city_id') && styles.list_item_click,
                )}
              >
                {item.get('city_name')}
              </div>
            )
          })}
        </Flex>
      </div>
    )
  }
}

export default CityList
