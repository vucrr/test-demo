import { Flex } from 'antd-mobile'
import classnames from 'classnames'
import { LazyImage } from 'components'
import { TrackEventCategory } from 'configs/trackEventLabels'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import styles from './BrandTabs.less'

interface BrandTabsProps {
  tag?: string
  list: any
  brand: string
  onChangeBrand: ({ selectedBrandId }: { selectedBrandId: number }) => void
}

export interface BrandTabsState {
  curBrand: number
}

class BrandTabs extends React.Component<BrandTabsProps, BrandTabsState> {
  static defaultProps = {
    brand: '0',
  }

  readonly state: Readonly<BrandTabsState> = {
    curBrand: +this.props.brand,
  }

  componentWillReceiveProps(nextProps: BrandTabsProps) {
    // 重置brand至全部状态
    if (nextProps.tag !== this.props.tag) {
      this.setState({ curBrand: 0 })
      this.props.onChangeBrand({ selectedBrandId: 0 })
    }
  }

  handleClick = (brandId: number) => () => {
    this.setState({ curBrand: brandId })
    this.props.onChangeBrand({ selectedBrandId: brandId })
    trackClickEvent({
      category: TrackEventCategory.Category,
      label: `${TrackEventCategory.Tabs.CategoryZongF}\t${brandId}`,
    })
  }

  render() {
    const { list } = this.props
    const { curBrand } = this.state
    return (
      <div className={styles.tab_box}>
        {list.map((item: any, key: number) => (
          <Flex
            key={key}
            justify="center"
            align="center"
            direction="column"
            className={classnames(styles.item, item.get('brand_id') === curBrand && styles.active)}
            onClick={this.handleClick(item.get('brand_id'))}
          >
            <LazyImage
              className={styles.icon}
              src={item.get('brand_id') === curBrand ? item.get('select_logo') : item.get('default_logo')}
            />
            <p>{item.get('name')}</p>
          </Flex>
        ))}
      </div>
    )
  }
}

export default BrandTabs
