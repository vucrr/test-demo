import { Link, withSource } from 'components'
import { SourceProps } from 'components/withSource'
import Router from 'next/router'
import React from 'react'
import styles from './Bottom.less'

export interface BottomProps {}

export interface BottomState {
  isShow: boolean
}

class Bottom extends React.Component<BottomProps & SourceProps, BottomState> {
  readonly state: Readonly<BottomState> = {
    isShow: false,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollTop > 480) {
      this.setState({ isShow: true })
    }
  }

  handleClick = async () => {
    const { ua } = this.props
    if (ua.get('isApp')) {
      location.href = '/redirectAPP/home'
    } else {
      await Router.push('/')
    }
  }

  render() {
    const { isShow } = this.state
    return (
      <div className={styles.bottom}>
        <p>本活动最终解释权归享换机所有</p>
        <p>
          若有疑问，请联系客服：<a href="tel:4006700188">400-670-0188</a>
        </p>
        <div onClick={this.handleClick} className={styles.gotop}>
          回首页>
        </div>
        {isShow && (
          <div className={styles.btnBox}>
            <Link className={styles.btn} native={true} to={'/product/category'}>
              查看更多换新机型
            </Link>
          </div>
        )}
      </div>
    )
  }
}

export default withSource(Bottom)
