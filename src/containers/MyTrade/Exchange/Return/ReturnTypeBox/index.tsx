import { Flex, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon, withLoading } from 'components'
import { withLoadingProps } from 'components/withLoading'
import { TrackEventExchange } from 'configs/trackEventLabels'
import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'
import { trackClickEvent } from 'utils/piwik'
import EmailItem from './EmailItem'
import StoreItem from './StoreItem'
import styles from './StoreItem.less'
import Tab from './Tab'

const Item = Flex.Item

export type tabStatus = 0 | 1 | 2

export interface BottomProps {
  tab: tabStatus
}

const Bottom: React.FunctionComponent<BottomProps> = ({ tab }) => {
  const toStandard = async () => {
    trackClickEvent({
      category: TrackEventExchange.ReturnWayChoose.category,
      label: TrackEventExchange.ReturnWayChoose.name6,
    })
    await Router.push('/myaccount/return/standard')
  }
  const toItem = async () => {
    trackClickEvent({
      category: TrackEventExchange.ReturnWayChoose.category,
      label: TrackEventExchange.ReturnWayChoose.name7,
    })
    const via = tab === 1 ? 'store' : 'express'
    await Router.push('/myaccount/return/tips?via=' + via)
  }
  return (
    <div className={styles.store_item_box}>
      <Flex className={styles.item}>
        <Item className={classnames(styles.flex, styles.algin)} onClick={toStandard}>
          <span>还机标准</span>
          <span className={styles.gray_text}>了解质检内容 还机更高效</span>
        </Item>
        <Icon type="right" color="#ccc" />
      </Flex>
      <Flex className={classnames(styles.item, styles.split)}>
        <Item className={classnames(styles.flex, styles.algin)} onClick={toItem}>
          <span>还机须知</span>
          <span className={styles.gray_text}>重要事宜 还机必看</span>
        </Item>
        <Icon type="right" color="#ccc" />
      </Flex>
    </div>
  )
}

export interface ReturnTypeBoxProps {
  info: any
  onSaveReplaceReturn: Function
  onFetchStore: Function
  onSaveTab: Function
  query: any
  tab: any
}

export interface ReturnTypeBoxState {
  store: any
}

class ReturnTypeBox extends React.Component<ReturnTypeBoxProps & withLoadingProps, ReturnTypeBoxState> {
  readonly state: Readonly<ReturnTypeBoxState> = {
    // tab: 0,
    store: [],
  }
  componentDidMount = async () => {
    const { data } = await this.props.onFetchStore({ query: { ahs_store_id: this.props.query.store_id || 0 } })
    if (data.id) {
      this.setState({
        store: data,
        // tab: 1,
      })
    }
  }
  changeTab = async (tab: tabStatus) => {
    const label = tab === 1 ? TrackEventExchange.ReturnWayChoose.name3 : TrackEventExchange.ReturnWayChoose.name4
    trackClickEvent({ category: TrackEventExchange.ReturnWayChoose.category, label })
    await this.props.onSaveTab({ query: { tab } })
    // this.setState({ tab })
  }
  create = async () => {
    trackClickEvent({
      category: TrackEventExchange.ReturnWayChoose.category,
      label: TrackEventExchange.ReturnWayChoose.name8,
    })
    const { setAsyncLoading, setLoading } = this.props
    if (this.props.tab && (this.props.tab === 2 || this.state.store.store_id)) {
      const newTrade = JSON.parse(Cookies.get('newTrade') || '')
      setAsyncLoading(true)
      await this.props.onSaveReplaceReturn({
        query: {
          ...newTrade,
          old_trade_no: this.props.query.old_trade_no,
          return_type: this.props.tab,
          store_id: this.state.store.store_id || '',
          coop_no: '',
        },
      })
      setLoading(false)
    } else {
      Toast.info('请选择还机方式')
    }
  }
  render() {
    const { store } = this.state
    const { info, tab } = this.props

    return (
      <div className={styles.type_box}>
        <Tab tab={tab} onChange={this.changeTab} info={info} />
        {tab === 1 && <StoreItem store={store} trade_no={info.get('trade_no')} />}
        {tab === 2 && <EmailItem />}
        {tab > 0 && <Bottom tab={tab} />}
        <div className={styles.button_box}>
          <Button
            type="primary"
            fixed={true}
            disabled={tab === 0 || (tab === 1 && !store.store_id)}
            onClick={this.create}
          >
            下一步
          </Button>
        </div>
      </div>
    )
  }
}

export default withLoading(ReturnTypeBox)
