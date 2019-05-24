import { GetInitialPropsContext } from '@@types/next'
import { repairQualityDetailActions } from 'actions/myTrade/guangzhou'
import { Button, Flex } from 'antd-mobile'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import styles from './index.less'

const StoreDetailDate = [
  {
    title: '门店名称',
    content: 'store_name',
  },
  {
    title: '门店地址',
    content: 'store_address',
  },
  {
    title: '门店编码',
    content: 'store_code',
  },
  {
    title: '所在城市',
    content: 'city_name',
  },
]
class StoreDetail extends React.Component<{ detail: any; url: any; error: any }, { second: number; btn: boolean }> {
  static async getInitialProps({ store, req, query }: GetInitialPropsContext) {
    if (query.store_code) {
      await store.dispatch(repairQualityDetailActions({ query, req }))
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }
  readonly state = {
    second: 3,
    btn: true,
  }
  componentDidMount() {
    this.daojishi()
  }
  handleSubmit = async () => {
    location.href = `/account/login?redirect=${encodeURIComponent(`/product/category`)}`
  }
  daojishi = () => {
    const res = setInterval(() => {
      this.setState({
        second: --this.state.second,
      })
      if (this.state.second === 0) {
        clearInterval(res)
        this.setState({
          btn: false,
        })
      }
    }, 1000)
  }
  render() {
    const { detail, error } = this.props
    if (detail.get('errorMsg')) {
      return <Error statusCode={detail.get('status')} errorMsg={detail.get('errorMsg')} />
    } else if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }
    const containerProps = {
      renderHeader: <Header> 门店信息 </Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    const btnText = this.state.btn ? '确认后不可更改(' + this.state.second + 's)' : '确定'
    return (
      <Container {...containerProps}>
        <div className={styles.store_details}>
          {StoreDetailDate.map((item: any, index: number) => {
            return (
              <Flex className={styles.store_oy} key={index}>
                <h3 className={styles.store_tit}>{item.title}</h3>
                <p>{detail.get(item.content)}</p>
              </Flex>
            )
          })}
        </div>
        <Button className={styles.store_btn} type="warning" disabled={this.state.btn} onClick={this.handleSubmit}>
          {btnText}
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  detail: state.getIn(['myTrade', 'canton', 'store', 'detail']),
})
export default connect(mapStateToProps)(StoreDetail)
