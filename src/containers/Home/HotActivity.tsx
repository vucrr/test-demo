import { Flex } from 'antd-mobile'
import { LazyImage, Link } from 'components'
import { TrackEventHome } from 'configs/trackEventLabels'
import React from 'react'
import { TrackClickEventProperties } from 'utils/piwik'
import { renderLink } from 'utils/tools'
import styles from './HotActivity.less'

interface ItemBoxProps {
  className: string
  item: any
  trackEvent: TrackClickEventProperties
}

const ItemBox = ({ className, item, trackEvent }: ItemBoxProps) => (
  <Link to={renderLink({ item })} trackEvent={trackEvent}>
    <LazyImage className={className} src={item.get('image')} alt="" />
  </Link>
)

export interface HotActivityProps {
  title: string
  list: any
}

const HotActivity: React.FunctionComponent<HotActivityProps> = ({ title, list }) => {
  if (!list || list.size < 3) {
    return null
  }

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <Flex className={styles.wrapper} justify="between">
        <ItemBox
          className={styles.left}
          item={list.get(0)}
          trackEvent={{ label: TrackEventHome.BannerBox.ItemBox1, category: TrackEventHome.Category }}
        />
        <Flex direction="column" justify="between" className={styles.rightWrapper}>
          <ItemBox
            className={styles.right}
            item={list.get(1)}
            trackEvent={{ label: TrackEventHome.BannerBox.ItemBox2, category: TrackEventHome.Category }}
          />
          <ItemBox
            className={styles.right}
            item={list.get(2)}
            trackEvent={{ label: TrackEventHome.BannerBox.ItemBox3, category: TrackEventHome.Category }}
          />
        </Flex>
      </Flex>
    </div>
  )
}

export default HotActivity
