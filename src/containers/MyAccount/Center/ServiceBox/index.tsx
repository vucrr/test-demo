import { Flex } from 'antd-mobile'
import { Icon, Link, Swiper } from 'components'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { Contract } from 'interfaces/account/center'
import React from 'react'
import EmptyBox from './EmptyBox'
import ServiceItem from './ServiceItem'
import styles from './index.less'

const Item = Flex.Item

export interface TitleBoxProps {}

const TitleBox: React.FunctionComponent<TitleBoxProps> = () => {
  return (
    <Flex className={styles.title_box} align="center">
      <Item>我的服务</Item>
      <Link className={styles.link} to={'/myaccount/service/list'} trackEvent={TrackEventMyCenter.ViewAllOrders}>
        查看全部 <Icon type="right" />
      </Link>
    </Flex>
  )
}

export interface ServiceBoxProps {
  showTitle: boolean
  list: Contract[]
}

const ServiceBox: React.FunctionComponent<ServiceBoxProps> = ({ showTitle, list }) => {
  return (
    <>
      {showTitle && <TitleBox />}
      {list.length === 0 && <EmptyBox />}
      {list.length === 1 && (
        <div className={styles.item_box}>
          <div className={styles.item}>
            <ServiceItem item={list[0]} />
          </div>
        </div>
      )}
      {list.length > 1 && (
        <Swiper className={styles.carousel_list} centeredSlides={true} slidesPerView={1.09} spaceBetween={10}>
          {list.map((item: Contract, key: number) => (
            <div className={styles.item} key={key}>
              <ServiceItem item={item} />
            </div>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default ServiceBox
