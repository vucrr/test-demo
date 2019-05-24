// import { lockPhone, searchPhone, selectNewPhone } from 'actions/myTrade/hunanMobile'
import { lockPhone, searchPhone } from 'actions/enterprise/mytrade/pickNumber'
import { InputItem, Toast } from 'antd-mobile'
import classnames from 'classnames'
import { Button, Icon } from 'components'
import { TrackEventEnterPrise } from 'configs/trackEventLabels'
import Cookies from 'js-cookie'
import debounce from 'lodash.debounce'
import Router from 'next/router'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { trackClickEvent } from 'utils/piwik'
import { delayHandle, scrollWithAnimation } from 'utils/tools'
import List from './List'
// import Package from './Package'
import styles from './Search.less'

interface Props {
  recommendList: any
  newNumber: any
  searchPhone: Function
  changeRecommendList: Function
  lockPhone: Function
  query: any
  packageName: any
}

interface State {
  hiddenWhenFocus: boolean
  showNoneBox: boolean
  showResultBox: boolean
  isChangingList: boolean
  showCheckNumber: boolean
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
      showCheckNumber: false,
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
    }
    await delayHandle(0.1)
    scrollWithAnimation(0, 0)
    trackClickEvent({
      category: TrackEventEnterPrise.Category,
      label: TrackEventEnterPrise.Search.NumberSearch,
    })
  }

  handleSearchPhone = async (value: string) => {
    if (value.length < 2) {
      this.setState({
        showNoneBox: false,
        showResultBox: false,
      })
      return false
    }
    const searchQuery = { ...this.props.query, phone_number: value, page_size: 200 }
    const data = await this.props.searchPhone({ query: searchQuery })
    if (data.phone && data.phone.length > 0) {
      this.setState({
        list: data.phone,
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
    value = value.replace(/\s+/g, '') // 去
    this.setState({
      value: value,
    })
    if (value.length < 1) {
      this.setState({
        showResultBox: false,
        showNoneBox: false,
      })
    }

    await this.handleSearchPhone(value)
  }

  onChangeList = async () => {
    if (!this.state.isChangingList) {
      this.setState({
        isChangingList: true,
      })
      await this.props.changeRecommendList()
      await delayHandle(0.5)
      this.setState({
        isChangingList: false,
      })
    }
    trackClickEvent({
      category: TrackEventEnterPrise.Category,
      label: TrackEventEnterPrise.Search.Switching,
    })
  }

  cancelSearch = () => {
    if (!this.state.hiddenWhenFocus) {
      this.setState({
        hiddenWhenFocus: true,
        showResultBox: false,
        showNoneBox: false,
        value: '',
      })
    }
    trackClickEvent({
      category: TrackEventEnterPrise.Category,
      label: TrackEventEnterPrise.Search.NumberSearchCancel,
    })
  }
  changShowNumber = () => {
    this.setState({
      showCheckNumber: true,
    })
  }
  onSubmit = async () => {
    const query = {
      ...this.props.query,
      phone_number: this.props.newNumber,
    }
    const goUrl: any = (Router.router && Router.router.query && Router.router.query.go) || ''
    const res = await this.props.lockPhone({ query: query })
    if (res.status === true) {
      Toast.info(res.msg, 2)
      Cookies.set(
        'phone_number',
        { vas_id: this.props.query.vas_id, phone_number: this.props.newNumber },
        { expires: 1 },
      )
      await Router.push(decodeURIComponent(goUrl))
    } else {
      Toast.info(res.msg, 2)
    }
    trackClickEvent({
      category: TrackEventEnterPrise.Category,
      label: TrackEventEnterPrise.Btns.NumberConfirmed,
    })
  }

  render() {
    const { hiddenWhenFocus, showNoneBox, showResultBox, showCheckNumber, isChangingList, value } = this.state
    return (
      <>
        <div className={classnames(styles.searchBox, !hiddenWhenFocus && styles.showCancelBox)}>
          {hiddenWhenFocus && (
            <>
              <p className={styles.title}>请选择手机号码</p>
              <p className={styles.subtit}>{this.props.packageName}</p>
            </>
          )}
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
            <List list={this.state.list} searchValue={this.state.value} changShowNumber={this.changShowNumber} />
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
            <List list={this.props.recommendList} searchValue={null} changShowNumber={this.changShowNumber} />
          </div>
        )}
        {showCheckNumber && <div className={styles.checkNumber}>已选：{this.props.newNumber}</div>}
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
  newNumber: state.getIn(['enterprise', 'mytrade', 'pickNumber', 'phoneNum']),
})

const mapDispatchToProps = (dispatch: any) => ({
  searchPhone: bindActionCreators(searchPhone, dispatch),
  lockPhone: bindActionCreators(lockPhone, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
