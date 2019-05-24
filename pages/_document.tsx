import classnames from 'classnames'
// import { readFileSync } from 'fs'
import Document, { Head, Main, NextDocumentContext, NextScript } from 'next/document'
import React from 'react'
import { assetPrefix } from 'utils/config'

export default class extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    return Document.getInitialProps(ctx)
  }

  // getVersion() {
  //   return isProd ? `?ver=${readFileSync(`${process.cwd()}/build/BUILD_ID`)}` : `?ver=${new Date().getTime()}`
  // }

  render() {
    const state = this.props.__NEXT_DATA__.props.store.getState()
    const isQsy =
      state.getIn(['serverApp', 'headers3', 'channelId']) === '41' ||
      state.getIn(['serverApp', 'headers2', 'channelId']) === 41
    return (
      <html lang="en">
        <Head>
          {/*<meta*/}
          {/*  name="viewport"*/}
          {/*  content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"*/}
          {/*/>*/}
          <meta
            name="Keywords"
            content="半价换新机, 小吴, 手机租赁，租手机，iPhone，小米，三星，平板租赁，爱回收，晋松，芝麻信用，蚂蚁花呗"
          />
          <meta
            name="description"
            content="【半价换新机 就在享换机】享换机专业的手机信用租赁平台，为用户提供租赁·维修·换机一站式用机服务。帮助用户只为使用付费，年年低价换新机。目前已经与芝麻信用、蚂蚁花呗、三星等知名企业展开战略合作。"
          />
          <link rel="icon" href="//mstaticc.xianghuanji.com/favicon.ico" type="image/x-icon" />
          {/* <link rel="stylesheet" type="text/css" href={`${assetPrefix}/static/css/nprogress.css`} /> */}
          <link rel="stylesheet" type="text/css" href={`${assetPrefix}/static/css/antd-mobile.min.css`} />
          <link rel="stylesheet" type="text/css" href={`${assetPrefix}/static/css/swiper.min.css`} />
          {/* <link rel="stylesheet" href={`${assetPrefix}/_next/static/style.css${this.getVersion()}`} /> */}
          {/* <script type="text/javascript" src={`${assetPrefix}/static/js/fastclick.min.js`} /> */}
          <script type="text/javascript" src={`${assetPrefix}/static/js/core.min.js`} />
        </Head>
        <body className={classnames({ easeu: isQsy })}>
          <Main />
          <NextScript />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              // if ('addEventListener' in document) {
              //   document.addEventListener('DOMContentLoaded', function() {
              //     FastClick.attach(document.body);
              //   }, false);
              // }

              // if ('serviceWorker' in navigator) {
              //   navigator.serviceWorker
              //     .register('/service-worker.js')
              //     .then(function () {
              //       console.log('Service worker registered!')
              //     })
              //     .catch(function (error) {
              //       console.log('Error registering service worker: ', error)
              //     });
              // } else {
              //   console.log('Not supported by browser')
              // }

              // help 帮助中心ntkfstat.js需要的传递参数
              NTKF_PARAM = {
                siteid: 'kf_9593',  // 企业ID，必填，取值参见文档开始表
                settingid: 'kf_9593_1495434528643',     // 缺省客服配置ID，必填，取值参见文档开始表
                uid: '',    // 用户ID,未登录可以为空
                uname: '',  // 用户名，未登录可以为空
                isvip: '0',          // 是否为vip用户
                userlevel: '未登录用户',      // 网站自定义会员级别
              }

              //自用统计代码 Piwik

              function isApp() {
                var ua = navigator.userAgent;
                if (/enjoyChanging/.test(ua)) {
                    return true;
                }
                return false;
              }

              var _paq = _paq || [];
              if (!isApp()) {
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                // 开启内容追踪
                _paq.push(['trackVisibleContentImpressions']);
              }

              setTimeout(function () {
                if (!isApp()) {
                  (function(history){
                    var pushState = history.pushState;
                    var replaceState = history.replaceState;
                    history.pushState = function(state) {
                        if (typeof history.onpushstate == "function") {
                            history.onpushstate({ state: state });
                        }
                        // ... whatever else you want to do
                        // maybe call onhashchange e.handler
                        return pushState.apply(history, arguments);
                    };

                    history.replaceState = function(state) {
                      if (typeof history.onreplacestate == "function") {
                          history.onreplacestate({ state: state });
                      }
                      // ... whatever else you want to do
                      // maybe call onhashchange e.handler
                      return replaceState.apply(history, arguments);
                    };
                  })(window.history);

                (function () {
                  var u="//piwik.xianghuanji.com/";
                  _paq.push(['setTrackerUrl', u + 'piwik.php']);
                  _paq.push(['setSiteId', ${isQsy ? 6 : 1}]);
                  var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                  g.type = 'text/javascript';
                  g.async = true;
                  g.defer = true;
                  g.src = '//piwikstaticc.xianghuanji.com/piwik.js';
                  s.parentNode.insertBefore(g, s);

                    window.onpopstate = history.onreplacestate = history.onpushstate = function(event) {
                      _paq.push(['setReferrerUrl', window.location.href]);
                      setTimeout(function(){
                        //追踪一个新页面
                        _paq.push(['setCustomUrl', window.location.href]);
                        _paq.push(['setDocumentTitle', document.title]);
                        //以下一行代码将一次浏览传输到Piwik：
                        _paq.push(['trackPageView'])
                        // _paq.push(['enableLinkTracking']);
                        // 开启内容追踪
                        _paq.push(['trackVisibleContentImpressions']);
                      }, 0)
                    }
                  })();
                }
              }, 500);
          `,
            }}
          />
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <p><img src="//piwik.xianghuanji.com/piwik.php?idsite=1" style="border:0;" alt=""/></p>
          `,
            }}
          />
        </body>
      </html>
    )
  }
}
