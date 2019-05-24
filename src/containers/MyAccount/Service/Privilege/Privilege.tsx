import { Flex } from 'antd-mobile'
import { Button, Swiper } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import React from 'react'
import { TrackClickEventProperties, trackClickEvent } from 'utils/piwik'
import Empty from '../Empty'
import styles from './Privilege.less'

interface PrivilegeProps {
  page: number
  list: any
}

const Privilege = (props: PrivilegeProps) => {
  const { page, list } = props

  const forward = (link: string, trackEvent: TrackClickEventProperties) => () => {
    if (trackEvent) {
      trackClickEvent(trackEvent)
    }
    window.location.href = link
  }

  if (!list.size) {
    return (
      <div className={styles.emptyWrapper}>
        <Empty content="暂无专属权益" />
      </div>
    )
  }

  return (
    <Swiper
      className={styles.container}
      centeredSlides={true}
      slidesPerView={1.1}
      spaceBetween={10}
      dots={false}
      initialSlide={page || 0}
    >
      {list.map((item: any, index: number) => {
        return (
          <div className={styles.item} key={index}>
            <div className={styles.top} style={{ backgroundImage: `url(${item.get('img_url')}` }} />
            <Flex direction="column" className={styles.bottom}>
              <Flex justify="between" className={styles.titleWrapper}>
                <h1>{item.get('title')}</h1>
                <h1 className={styles.price}>{item.get('price')}</h1>
              </Flex>
              <Flex direction="column" justify="between" className={styles.detailWrapper}>
                <p>{item.get('content')}</p>
                {[2, 3].includes(item.get('operation_type')) && (
                  <Button
                    className={styles.button}
                    onClick={forward(item.get('link'), {
                      ...TrackEventMyCenter.RightButton,
                      label: item.get('title'),
                    })}
                    type="primary"
                  >
                    {item.get('button_name') || '查看'}
                  </Button>
                )}
              </Flex>
            </Flex>
          </div>
        )
      })}
    </Swiper>
  )
}

export default Privilege
