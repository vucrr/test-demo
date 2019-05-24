import { GetInitialPropsContext, NextSFC2 } from '@@types/next'
import { checkLogin } from 'actions/app'
import { SendtongdunParam, getCreditEntrydata, sendTongDun } from 'actions/myTrade/assess/list'
// import { Toast } from 'antd-mobile'
import { BreadCrumb, Container, Header, TabBar } from 'components'
import Error from 'containers/Error'
import { ErrorObject } from 'interfaces/error'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTongDunResult, isAndroid, isIOS } from 'utils/app'
import CreditTips from './CreditTips'
import InfoList from './InfoList'

export interface Query {
  trade_no: string // 订单号
  pay_no?: string // 支付单号
  type?: string //   支付步骤
  pis_code?: string // 担保方式code
}

interface CreditEvaluationProps extends ErrorObject {
  assessList: any
  query: Query
  onSendTongDunData: (params: SendtongdunParam) => void
}

const CreditEvaluation: NextSFC2<CreditEvaluationProps> = ({
  error,
  query,
  assessList,
  onSendTongDunData,
}: CreditEvaluationProps) => {
  const setTongDunInfo = () => {
    // 同盾代码植入
    ;(function() {
      window._fmOpt = {
        partner: 'xianghuanji',
        appName: 'xianghuanji_web',
        token:
          'xianghuanji' +
          '-' +
          new Date().getTime() +
          '-' +
          Math.random()
            .toString(16)
            .substr(2),
        fmb: true,
        getinfo: function() {
          return 'e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0='
        },
        fpHost: 'https://fptest.fraudmetrix.cn',
        staticHost: 'statictest.fraudmetrix.cn',
        tcpHost: 'fpflashtest.fraudmetrix.cn',
        wsHost: 'fptest.fraudmetrix.cn:9090',
      }
      const cimg = new Image(1, 1)
      cimg.onload = function() {
        window._fmOpt.imgLoaded = true
      }
      cimg.src =
        'https://fptest.fraudmetrix.cn/fp/clear.png?partnerCode=xianghuanji&appName=xianghuanji_web&tokenId=' +
        window._fmOpt.token
      const fm = document.createElement('script')
      fm.type = 'text/javascript'
      fm.async = true
      fm.src =
        ('https:' === document.location.protocol ? 'https://' : 'http://') +
        'static.fraudmetrix.cn/v2/fm.js?ver=0.1&t=' +
        (new Date().getTime() / 3600000).toFixed(0)
      const s = document.getElementsByTagName('script')[0]
      s && s.parentNode && s.parentNode.insertBefore(fm, s)
    })()
  }

  const sendTongDunResult = async () => {
    if (assessList.get('submit_status') === 1) {
      const blackBox = await getTongDunResult()
      const platform = (function() {
        if (isAndroid()) return 1
        if (isIOS()) return 2
        return 3
      })()
      onSendTongDunData({ blackBox, platform })
    }
  }

  useEffect(() => {
    setTongDunInfo()
    // 发送同盾统计事件到后端
    setTimeout(async () => {
      await sendTongDunResult()
    }, 1000)
  }, [])

  if (error) {
    return <Error statusCode={error.status} errorMsg={error.errorMsg} />
  }

  const containerProps = {
    renderHeader: <Header>信用评估确认</Header>,
    renderTabBar: <TabBar hidden={true} />,
    bgColor: '#ffffff',
  }

  const creditData = {
    creditTitle: assessList.get('credit_title'),
    creditDesc: assessList.get('credit_desc'),
    creditIcon: assessList.get('credit_icon'),
  }

  const InfoListData = {
    query,
    creditTips: assessList.get('credit_tips'),
    submitText: assessList.get('submit_text'),
    submitStatus: assessList.get('submit_status'),
    agreementInfo: {
      agreementMsg: assessList.getIn(['agreement_info', 'agreement_msg']),
      agreementName: assessList.getIn(['agreement_info', 'agreement_name']),
      agreementUrl: assessList.getIn(['agreement_info', 'agreement_url']),
    },
    stepList: assessList.get('step_list'),
  }

  return (
    <Container {...containerProps}>
      <BreadCrumb list={assessList.get('step_bar')} />
      <CreditTips {...creditData} />
      <InfoList {...InfoListData} />
    </Container>
  )
}

CreditEvaluation.getInitialProps = async ({ store, query, isServer, res, asPath, req }: GetInitialPropsContext) => {
  const isLogin = await store.dispatch(checkLogin({ isServer, res, asPath, req }))
  if (isLogin) {
    const data = await store.dispatch(getCreditEntrydata({ query, req }))
    if (data.status) {
      return { error: data }
    }
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  onSendTongDunData: bindActionCreators(sendTongDun, dispatch),
})

const mapStateToProps = (state: any) => ({
  assessList: state.getIn(['myTrade', 'assess', 'list']),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreditEvaluation)
