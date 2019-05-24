import { GetInitialPropsContext } from '@@types/next'
import { checkLogin } from 'actions/app'
import { returnResultsActions } from 'actions/myAccount/returnflow/detail'
import classnames from 'classnames'
import { Container, Header, Link, TabBar } from 'components'
import { AssetImage } from 'constant/uikit'
import Error from 'containers/Error'
import React from 'react'
import { connect } from 'react-redux'
import styles from './index.less'

interface ResultProps {
  results: any
  url: any
  isQsy: boolean
}

class Results extends React.Component<ResultProps> {
  static async getInitialProps({ store, isServer, query, res, asPath, req }: GetInitialPropsContext) {
    const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath }))
    if (isLogin) {
      await store.dispatch(returnResultsActions({ query, req }))
    }
  }

  render() {
    const { results, isQsy } = this.props
    if (results.get('errorMsg')) {
      return <Error statusCode={results.get('status')} errorMsg={results.get('errorMsg')} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
    }
    const containerProps = {
      renderHeader: <Header {...headerProps}>还机结果</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    const datas = {
      success: {
        img: AssetImage.ReturnFlow.Detail.returnSuccess,
        title: '恭喜你 还机成功',
        content: true,
      },
      waiting: {
        img: AssetImage.ReturnFlow.Detail.returnWaiting,
        title: '受理中 请稍后查看',
        content: false,
      },
    }
    const data = results.get('status') ? datas['success'] : datas['waiting']
    const isCredit = !results.get('is_credit') ? (
      <p>您已还机成功，花呗预授权将在1-3个工作日进行释放，请注意查看。</p>
    ) : (
      <p>您已还机成功，信用卡预授权将在7个工作日内进行释放，请注意查看</p>
    )
    const toHome = isQsy ? 'https://m.xianghuanji.com/' : '/'
    const toCategory = isQsy ? 'https://m.xianghuanji.com/product/category' : '/product/category'
    return (
      <Container {...containerProps}>
        <div className={styles.results}>
          <img src={data.img} alt="" />
          <h1>{data.title}</h1>
          {data.content ? (
            isCredit
          ) : (
            <p>
              若您有疑问请联系享换机客服<br /> <a href="tel:400-6700-188">400-6700-188</a>
            </p>
          )}
        </div>
        <div className={classnames(styles.tab, isQsy && styles.tab_qsy)}>
          <Link to={toHome}>回到首页</Link>
          <Link to={toCategory}>去租新机</Link>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  results: state.getIn(['myAccount', 'returnflow', 'detail', 'results']),
  isQsy: state.getIn(['serverApp', 'utm', 'isQsy']),
})
export default connect(mapStateToProps)(Results)
