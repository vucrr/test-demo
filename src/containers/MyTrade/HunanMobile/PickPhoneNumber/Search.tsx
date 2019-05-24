import { lockPhone, searchPhone, selectNewPhone } from 'actions/myTrade/hunanMobile'
import { InputItem, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon } from 'components'
import debounce from 'lodash.debounce'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { delayHandle, scrollWithAnimation } from 'utils/tools'
import List from './List'
import Package from './Package'
import styles from './Search.less'

interface Props {
  recommendList: any
  newNumber: any
  searchPhone: Function
  changeRecommendList: Function
  emptyNewPhone: Function
  lockPhone: Function
}

interface State {
  hiddenWhenFocus: boolean
  showNoneBox: boolean
  showResultBox: boolean
  isChangingList: boolean
  list: any
  value: any
}

class Search extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hiddenWhenFocus: true,
      showNoneBox: false,
      showResultBox: false,
      isChangingList: false,
      list: '',
      value: '',
    }
    this.handleSearchPhone = debounce(this.handleSearchPhone, 800)
  }

  onFocus = async () => {
    if (this.state.hiddenWhenFocus) {
      this.setState({
        hiddenWhenFocus: false,
      })
      this.props.emptyNewPhone('')
    }
    await delayHandle(0.1)
    scrollWithAnimation(0, 0)
  }

  handleSearchPhone = async (value: number) => {
    const data = await this.props.searchPhone({ number: value })

    if (data.length > 0) {
      this.setState({
        list: data,
        showResultBox: true,
        showNoneBox: false,
      })
    } else {
      this.setState({
        showNoneBox: true,
        showResultBox: false,
      })
    }
  }

  onInputChange = async (value: any) => {
    value = value.replace(/\s+/g, '') // 去掉空格
    this.setState({
      value: value,
    })
    if (value.length < 1) {
      this.setState({
        showResultBox: false,
        showNoneBox: false,
      })
    }

    this.props.emptyNewPhone('')
    await this.handleSearchPhone(value)
  }

  onChangeList = async () => {
    if (!this.state.isChangingList) {
      this.setState({
        isChangingList: true,
      })
      this.props.emptyNewPhone('')
      const query = {
        phoneGroup: this.props.recommendList.toString(),
      }
      await this.props.changeRecommendList(query)
      await delayHandle(0.5)
      this.setState({
        isChangingList: false,
      })
    }
  }

  cancelSearch = () => {
    if (!this.state.hiddenWhenFocus) {
      this.setState({
        hiddenWhenFocus: true,
        showResultBox: false,
        showNoneBox: false,
        value: '',
      })
      this.props.emptyNewPhone('')
    }
  }

  onSubmit = async () => {
    const query = {
      phone: this.props.newNumber,
      type: 2,
    }
    const goUrl: any = (Router.router && Router.router.query && Router.router.query.go) || ''
    const res = await this.props.lockPhone({ ...query })
    if (res.status === 101) {
      await Router.push(decodeURIComponent(goUrl))
    } else {
      Toast.info(res.msg, 2)
    }
  }

  render() {
    const { hiddenWhenFocus, showNoneBox, showResultBox, isChangingList, value } = this.state
    return (
      <>
        <Package show={hiddenWhenFocus} />
        <div className={styles.searchBox}>
          {hiddenWhenFocus && <h2 className={styles.title}>请选择手机号码</h2>}
          <div className={styles.inputWrap}>
            <InputItem
              onFocus={this.onFocus}
              onChange={v => this.onInputChange(v)}
              placeholder="可输入生日、幸运数字等"
              type="phone"
              value={value}
              clear={true}
              className={classnames(styles.searchInput, !hiddenWhenFocus && styles.showCancel)}
            >
              <Icon type={require('svg/search.svg')} className={styles.icon} />
            </InputItem>
            {!hiddenWhenFocus && (
              <div className={styles.btnCancel} onClick={this.cancelSearch}>
                取消
              </div>
            )}
          </div>
        </div>

        {showNoneBox && (
          <div className={styles.noneBox}>
            未找到包含“<i className={styles.text}>{this.state.value}</i>”的号码，换个数字试试吧
          </div>
        )}

        {showResultBox && (
          <div className={styles.resultBox}>
            <List list={this.state.list} searchValue={this.state.value} />
          </div>
        )}

        {(hiddenWhenFocus || showNoneBox) && (
          <div className={styles.recommendBox}>
            <div className={styles.title}>
              <span>为你推荐</span>
              <span className={styles.btnChange} onClick={this.onChangeList}>
                <Icon
                  type={require('svg/arrow-loading.svg')}
                  className={classnames(styles.icon, isChangingList && styles.active)}
                />
                换一批
              </span>
            </div>
            <List list={this.props.recommendList} searchValue={null} />
          </div>
        )}

        <Button
          type="primary"
          fixed={true}
          disabled={!this.props.newNumber}
          onClick={this.onSubmit}
          className={styles.btn}
        >
          确定
        </Button>
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  newNumber: state.getIn(['myTrade', 'hunanMobile', 'phone']),
})

const mapDispatchToProps = (dispatch: any) => ({
  searchPhone: bindActionCreators(searchPhone, dispatch),
  emptyNewPhone: bindActionCreators(selectNewPhone, dispatch),
  lockPhone: bindActionCreators(lockPhone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
