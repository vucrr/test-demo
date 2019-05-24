import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { Tabs, Flex, Accordion } from 'antd-mobile'
import { Icon, Link } from 'components'
import styles from './TabContent.less'
import AddForm from './AddForm'

const Item = Flex.Item

const Empty = ({ status }) => {
  const dicText = {
    0: '未使用',
    1: '已使用',
    2: '已失效',
  }

  return (
    <Flex className={classnames(styles.empty, status === 0 && styles.with_add)} align="center" justify="center">
      <Item className={styles.box}>
        <Icon className={styles.icon} type={require('svg/empty-cart.svg')} />
        <br />
        暂无{dicText[status]}的卡券
      </Item>
    </Flex>
  )
}
Empty.propTypes = {
  status: PropTypes.number.isRequired,
}

const Content = ({ list, status }) => {
  if (list.count() === 0) {
    return (
      <Fragment>
        <AddForm />
        {!list.count() && <Empty status={status} />}
      </Fragment>
    )
  }

  return (
    <Fragment>
      {status === 0 && <AddForm />}
      <div className={styles.list_box}>
        {list.map(item => (
          <Fragment key={item.get('id')}>
            <Flex className={styles.list} align="stretch">
              <div className={classnames(styles.thumbs, styles.gray)}>
                <img className={styles.thumb} src={item.get('thumb')} alt="" />
              </div>
              <Item className={styles.text_box}>
                <div className={classnames(styles.title, status === 2 && styles.gray)}>
                  {item.get('price')}元{item.get('title')}
                </div>
                <div className={styles.sub_title}>{item.get('usedType')}</div>
                <div className={styles.date}>
                  {item.get('start')}至{item.get('end')}
                </div>
              </Item>
              {status === 0 && (
                <Link className={styles.btn} to="/product/category">
                  立即使用
                </Link>
              )}
              {status === 1 && <span className={classnames(styles.btn, styles.btn_gray)}>已使用</span>}
              {status === 2 && <span className={classnames(styles.btn, styles.btn_gray)}>已失效</span>}
            </Flex>
            <Accordion className={styles.accordion}>
              <Accordion.Panel header="使用规则：优惠金额平摊到每月租金中抵扣">
                {/* <div className={styles.extra}>我是额外内容</div> */}
              </Accordion.Panel>
            </Accordion>
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}
Content.propTypes = {
  list: PropTypes.instanceOf(Immutable.List).isRequired,
  status: PropTypes.number.isRequired,
}

const TabContent = () => {
  const tabs = [{ title: '未使用' }, { title: '已使用' }, { title: '已失效' }]

  const tabProps = {
    tabs,
    tabBarActiveTextColor: '#ff5544', // tabBar激活Tab文字颜色
    tabBarUnderlineStyle: { border: '1px solid #ff5544' }, // tabBar下划线样式
  }

  const list = Immutable.fromJS([
    {
      id: 1,
      title: '手机专享免租劵',
      thumb:
        'https://img2.xianghuanji.com/image/product/5e9e9eae612e34d99fc64a0d9d89e3cbed5ddea7.png@128w_128h_1e_1c.png',
      price: 120,
      usedType: '全部收集通用',
      start: '2018-4-14',
      end: '2018-5-14',
      status: 0,
    },
    {
      id: 2,
      title: '手机专享免租劵',
      thumb:
        'https://img2.xianghuanji.com/image/product/5e9e9eae612e34d99fc64a0d9d89e3cbed5ddea7.png@128w_128h_1e_1c.png',
      price: 80,
      usedType: '全部收集通用',
      start: '2018-4-14',
      end: '2018-5-14',
      status: 0,
    },
    {
      id: 3,
      title: '手机专享免租劵',
      thumb:
        'https://img2.xianghuanji.com/image/product/5e9e9eae612e34d99fc64a0d9d89e3cbed5ddea7.png@128w_128h_1e_1c.png',
      price: 100,
      usedType: '全部收集通用',
      start: '2018-4-14',
      end: '2018-5-14',
      status: 0,
    },
  ])

  return (
    <Tabs {...tabProps}>
      <Content list={Immutable.fromJS([])} status={0} />
      <Content list={list} status={1} />
      <Content list={list} status={2} />
    </Tabs>
  )
}

TabContent.propTypes = {
  //   status: PropTypes.number.isRequired,
}

export default TabContent
