import classnames from 'classnames'
import { Icon } from 'components'
import React from 'react'
import styles from './Product.less'

class ProductOne extends React.Component<{ hot: any }> {
  state = {
    popover: false,
    title: '',
  }
  noApp = () => {
    this.setState({
      popover: false,
      title: '',
    })
  }
  toast = (res: string) => {
    this.setState({
      popover: true,
      title: res,
    })
  }
  render() {
    const { hot } = this.props
    return (
      <>
        <div className={styles.product}>
          <h2 className={styles.title}>爆款机型 超值拥有</h2>
          <ul>
            {hot.map((item: any, index: number) => {
              return (
                <li className={styles.phone} onClick={() => this.toast(item.get('title'))} key={index}>
                  <img src={item.get('imgUrl')} />
                  <p className={styles.name}>{item.get('title')}</p>
                  <p className={styles.price}>
                    <span className={styles.price_num}>{item.get('price')}</span>/月起
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={classnames(styles.pop_down, this.state.popover && styles.show)}>
          <div className={styles.popover}>
            <h2 className={styles.title}>
              下载APP，立即拥有<span className={styles.name}>{this.state.title}</span>
            </h2>
            <div className={styles.btn_wrap}>
              <a className={styles.btn_left} onClick={this.noApp}>
                取消
              </a>
              <a href="/site/appdownloadproceed" className={styles.btn_right}>
                下载
              </a>
            </div>
          </div>
        </div>
      </>
    )
  }
}
const ProductTwo = () => {
  return (
    <div className={styles.reason}>
      <h2 className={styles.title}>为什么选择分期租机</h2>
      <p className={styles.tips}>（以价值5888元的手机为例）</p>
      <ul>
        <li className={styles.example}>
          <span className={styles.tag}>先用一年</span>
          <div className={styles.info_left}>
            <Icon type={require('svg/smileface.svg')} className={styles.icon} />
            <p className={styles.desc}>
              分期租机更划算<br />298元/月起
            </p>
            <p className={styles.stressSale}>支付宝代扣更方便</p>
          </div>
          <div className={styles.info_right}>
            <Icon type={require('svg/cryface.svg')} className={styles.icon} />
            <p className={styles.desc}>
              分期购买月供高<br />508元/月起
            </p>
          </div>
        </li>
        <li className={classnames(styles.example, styles.example_2)}>
          <span className={styles.tag}>一年后</span>
          <div className={styles.info_left}>
            <Icon type={require('svg/smileface.svg')} className={styles.icon} />
            <p className={styles.desc}>
              弹性方案<br />自由选择
            </p>
            <p className={styles.supplement}>
              一年后还机、续租、<br />买断任您选
            </p>
          </div>
          <div className={styles.info_right}>
            <Icon type={require('svg/cryface.svg')} className={styles.icon} />
            <p className={styles.desc}>
              换机难<br />限制多
            </p>
            <p className={styles.supplement}>
              只能忍受新机诱<br />惑，旧机卡顿
            </p>
          </div>
        </li>
      </ul>
    </div>
  )
}
const Product = (res: any) => (
  <>
    {!res.isWeibo && <ProductOne hot={res.hot} />}
    <ProductTwo />
  </>
)

export default Product
