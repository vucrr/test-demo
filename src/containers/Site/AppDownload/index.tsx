import { GetInitialPropsContext } from '@@types/next'
import { appdownloadActions } from 'actions/site/appdownload'
import { Container, Header, TabBar } from 'components'
import React from 'react'
import { connect } from 'react-redux'
import Banner from './Banner'
import Product from './Product'
import Footer from './footer'

interface AppDownloadProps {
  url: {
    query: {
      autodownload: any
      utm_source: any
    }
  }
  appdownload: any
  ua: any
}
class AppDownload extends React.Component<AppDownloadProps> {
  static async getInitialProps({ store, req, query }: GetInitialPropsContext) {
    await store.dispatch(appdownloadActions({ query, req }))
  }
  componentDidMount() {
    const {
      ua,
      appdownload,
      url: { query },
    } = this.props
    if (query.autodownload) {
      const path = ua.get('isIOS') ? 'ios' : 'android'
      if (appdownload.getIn(['appDownloadUrl', path])) {
        location.href = appdownload.getIn(['appDownloadUrl', path])
      }
    }
  }
  render() {
    const {
      url: { query },
      appdownload,
    } = this.props
    const headerProps = {
      rightContentType: 'tabBar',
    }
    const isWeibo = query.utm_source === 'weibo' ? true : false
    const containerProps = {
      renderHeader: <Header {...headerProps}>APP下载</Header>,
      renderTabBar: <TabBar hidden={true} />,
    }
    return (
      <Container {...containerProps}>
        <Banner query={query} />
        <Product hot={appdownload.get('hot')} isWeibo={isWeibo} />
        <Footer query={query} isWeibo={isWeibo} />
      </Container>
    )
  }
}

const mapStateToProps = (state: any) => ({
  appdownload: state.getIn(['site', 'appdownload']),
  ua: state.getIn(['serverApp', 'ua']),
})
export default connect(mapStateToProps)(AppDownload)
