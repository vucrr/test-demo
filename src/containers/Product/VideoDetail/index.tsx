import { fetchVideoDetail } from 'actions/product/video-detail'
import { Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RecommendList from './../../Account/Center/RecommendList'
import Download from './Download'
import Introduce from './Introduce'
import Product from './Product'
import Video from './Video'
import styles from './index.less'

interface VideoDetailProps extends ErrorObject {
  detail: any
  isApp: boolean
}

class VideoDetail extends Component<VideoDetailProps> {
  static getInitialProps = async ({ store, query, req }: any) => {
    if (query.video_id) {
      await store.dispatch(fetchVideoDetail({ query, req }))
    } else {
      return { error: { status: 500, errorMsg: '路由参数不合法' } }
    }
  }

  $video: HTMLVideoElement | null = null

  componentDidMount() {
    this.$video = document.querySelector('#video')
  }

  handleClick = () => {
    if (this.$video) {
      this.$video.pause()
    }
  }

  render() {
    const detailInfo = this.props.detail
    const { error, isApp } = this.props

    if (error) {
      return <Error statusCode={error.status} errorMsg={error.errorMsg} />
    }

    const headerProps = {
      rightContentType: 'tabBar',
      extendHead: (
        <script
          async={true}
          id="Alipay"
          src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"
        />
      ),
    }

    const containerProps = {
      renderHeader: <Header {...headerProps}>{detailInfo.getIn(['video', 'title'])}</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }

    return (
      <Container {...containerProps}>
        <Video video={detailInfo.getIn(['video'])} />
        <Download />
        <Introduce introduce={detailInfo.getIn(['video'])} />
        {isApp ? (
          <div onClick={this.handleClick}>
            <Product product={detailInfo.getIn(['video_product'])} />
            <RecommendList list={detailInfo.getIn(['recommend_products'])} />
          </div>
        ) : (
          <>
            <Product product={detailInfo.getIn(['video_product'])} />
            <RecommendList list={detailInfo.getIn(['recommend_products'])} />
          </>
        )}

        <div className={styles.last}>· 已经到底了哦 ·</div>
      </Container>
    )
  }
}

const mapStatetoProps = (state: any) => ({
  detail: state.getIn(['product', 'videoDetail']),
  isApp: state.getIn(['serverApp', 'ua', 'isApp']),
})

export default connect(mapStatetoProps)(VideoDetail)
