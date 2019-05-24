import React from 'react'
import { withRouter } from 'next/router'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import createStore from 'store/createStore'
import { Provider } from 'react-redux'
import { tools } from 'utils'

// 修复dev模式下切换页面样式丢失的问题
// TODO 待官方修复后删除此部分
// const fixDevStyle = () => {
//   const injectCss = (prev, href) => {
//     const link = prev.cloneNode()
//     link.href = href
//     prev.stale = true
//     prev.parentNode && prev.parentNode.insertBefore(link, prev)
//     link.onload = function() {
//       prev.parentNode && prev.parentNode.removeChild(prev)
//     }
//   }
//
//   document.head.querySelectorAll('link[href][rel=stylesheet]').forEach(link => {
//     if (!/styles\.chunk\.css/.test(link.href)) return
//     injectCss(link, `${link.href.split('?')[0]}?unix=${new Date().getTime()}`)
//   })
// }
//
// isProd || Router.events.on('beforeHistoryChange', fixDevStyle)
// fix end

class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    // tslint:disable-next-line
    const url = typeof window !== 'undefined' ? `url: ${window.location.href} ` : ''
    tools.ErrorLog(`${url}handle a componentDidCatch: ${error}-${errorInfo.componentStack}`)
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo)
  }

  componentDidMount() {
    // isProd || fixDevStyle()
  }

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    return { pageProps }
  }

  render() {
    const { Component, pageProps, router, store } = this.props
    const { asPath, pathname, query } = router
    const url = { asPath, pathname, query }
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} url={url} query={query} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withRouter(MyApp))
