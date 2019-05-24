import { Flex } from 'antd-mobile'
import { LazyImage } from 'components'
import { AssetImage } from 'constant/uikit'
import React from 'react'
import styles from './BottomBox.less'

const Item = Flex.Item

export interface BrandStroyProps {
  title: string
  list: any
}

const BrandStroy: React.FunctionComponent<BrandStroyProps> = ({ title, list }) => {
  if (!list) {
    return null
  }

  return (
    <div className={styles.story_box}>
      <h1>{title}</h1>
      <Flex>
        {list.map((item: any, key: number) => (
          <Item key={key} className={styles.item}>
            <LazyImage className={styles.icon} key={key} src={item.get('icon')} />
            <p>{item.get('title')}</p>
            <span>{item.get('desc')}</span>
          </Item>
        ))}
      </Flex>
    </div>
  )
}

export interface BottomBoxProps {
  title: string
  list: any
}

const BottomBox: React.FunctionComponent<BottomBoxProps> = ({ title, list }) => {
  return (
    <>
      <BrandStroy title={title} list={list} />
      <div className={styles.bottom}>
        <a
          className={styles.sign_link}
          href="https://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&entyId=20180321120114341"
        >
          <img src={AssetImage.Home.SGS} alt="" />
          <span>上海工商</span>
        </a>
        {/* <span className={styles.text}>· 已经到底了哦 ·</span> */}
      </div>
    </>
  )
}

export default BottomBox
