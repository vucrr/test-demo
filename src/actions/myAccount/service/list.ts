import { getHeaders2 } from 'actions/actionHelper'
import { createStrategyPay } from 'actions/myTrade/order/pay'
import { Modal, Toast } from 'antd-mobile'
import { TrackEventMyCenter } from 'configs/trackEventLabels'
import { BUTTON_TYPE } from 'constant/common'
import { FETCH_SERVICE_LIST, FETCH_SERVICE_LIST_MORE } from 'constant/index'
import {
  CheckBuyOutStatus,
  CheckReplaceMent,
  CheckReturnStatus,
  ServiceListReturns,
} from 'interfaces/account/service/list'
import { ErrorReturn } from 'interfaces/error'
import Router from 'next/router'
import { Action, Dispatch } from 'redux'
import { createAction } from 'redux-actions'
import { isWechat } from 'utils/app'
import { axios, tools } from 'utils/index'
import { trackClickEvent } from 'utils/piwik'

interface Params {
  status: '1' | '2'
  page: number
  limit?: number
  order?: number
}

export const fetchList = (params: Params, isLoadMore: boolean, req?: any) => async (dispatch: Dispatch<Action>) => {
  const url = 'node-api/account/service/list'
  const headers = getHeaders2(req)
  try {
    const { data } = await axios.get<ServiceListReturns & ErrorReturn>(url, {
      params,
      headers,
    })
    if (data.errorMsg) {
      return data
    }
    let action
    if (isLoadMore) {
      action = createAction<{ info: ServiceListReturns; page: number }>(FETCH_SERVICE_LIST_MORE)
    } else {
      action = createAction<{ info: ServiceListReturns; page: number }>(FETCH_SERVICE_LIST)
    }
    dispatch(action({ info: data, page: params.page }))
  } catch (err) {
    tools.ErrorLog(err)
  }
}

export interface ButtonOptionsProps {
  contractNo?: string
  returnflowTradeNo?: string // 合约状态为换机中，新订单已签收，老订单待还，进入还机详情是不能取消还机申请，还机详情按钮上的订单号 需要使用 returnflow_trade_no
  contractStatus?: number
  tradeNo: string
  returnflowSubTradeNo?: string // 查询还机详情页的子订单号，是个坑
  buttonType: string
  buttonLink?: string
  returnDetailType?: string // 还机详情 type 区分门店和邮寄
  isSmallApp?: boolean // 是否是小程序的订单
  pisCode?: string // 策略支付入参
  payNo?: string // 策略支付入参
}

interface DicType {
  event: {
    category: string
    label: string
  }
  link?: string
}

type DicLinkType = {
  [index: string]: DicType
}

export const buttonOptions = (params: ButtonOptionsProps) => async (dispatch: Dispatch<any>) => {
  const dicLink: DicLinkType = {
    1: {
      link: `/myaccount/service/cancel?contract_no=${params.contractNo}&type=1`, // 待发货取消
      event: { category: TrackEventMyCenter.Cancel.category, label: '待发货取消' },
    },
    2: {
      link: `/myaccount/service/cancel?contract_no=${params.contractNo}&type=2`, // 审核中取消
      event: { category: TrackEventMyCenter.Cancel.category, label: '审核中取消' },
    },
    7: {
      link: `/myaccount/service/cancel?contract_no=${params.contractNo}&type=7`, // 取消换机
      event: { category: TrackEventMyCenter.Cancel.category, label: '取消换机' },
    },
    13: {
      link: `/myaccount/service/cancel?contract_no=${params.contractNo}&type=13`, // 付款后取消换机
      event: { category: TrackEventMyCenter.Cancel.category, label: '付款后取消换机' },
    },

    3: {
      event: TrackEventMyCenter.Termination, // 终止服务按钮，没有处理逻辑
    },
    4: {
      link: `/myaccount/repair/category?trade_no=${params.tradeNo}`, // 申请售后维修
      event: TrackEventMyCenter.ApplyAfterSale,
    },
    5: {
      event: TrackEventMyCenter.Change, // 立即换机，有资格判断
    },
    6: {
      link: `/myaccount/service/return-plan/list?contract_no=${params.contractNo}`, // 提前还款(立即还款)
      event: TrackEventMyCenter.Repayment,
    },

    8: {
      link: `/mytrade/order/pay?trade_no=${params.tradeNo}`, // 继续申请,
      event: TrackEventMyCenter.Continue,
    },
    12: {
      link: `/mytrade/order/pay?trade_no=${params.tradeNo}`, // 去授权,
      event: TrackEventMyCenter.Continue,
    },
    14: {
      link: `/mytrade/order/pay?trade_no=${params.tradeNo}`, // 换机继续申请,
      event: TrackEventMyCenter.Continue,
    },

    9: {
      link: `/returnflow/detail/${params.returnflowTradeNo}`, // 去支付(提前还机服务费)
      event: { category: TrackEventMyCenter.Payment.category, label: '支付提前还机服务费' },
    },

    10: {
      link: `/returnflow/returndetailmain/${params.returnflowTradeNo}`, // 还机详情(还机详情页)
      event: TrackEventMyCenter.RemandDetails,
    },
    15: {
      link: `/returnflow/returndetailmain/${params.returnflowTradeNo}?paytype=1`, // 去支付(还机赔偿页)
      event: { category: TrackEventMyCenter.Payment.category, label: '支付赔偿金' },
    },
    16: {
      link: `/returnflow/returndetailmain/${params.returnflowTradeNo}`, // 取消还机(还机详情页)
      event: TrackEventMyCenter.RemandCancel,
    },

    11: {
      link: `/myaccount/repair/quality-detail?sn=`, // 维修详情
      event: TrackEventMyCenter.Maintenance,
    },
    // 17: {
    //   event: TrackEventMyCenter.ApplyForRemand, // 还机申请，有资格判断
    // },
    18: {
      event: TrackEventMyCenter.ApplyForBuyout, // 立即买断，有资格判断
    },
    19: {
      link: '/account/refundlist', // 申请退货（跳转至售后维修的退货tab）
      event: TrackEventMyCenter.ApplyForReturn,
    },
    // 20: '...', // 物流信息
    // 10: {
    //   link: `/myaccount/return/apply/${params.returnDetailType === '1' ? 'store' : 'express'}?sub_trade_no=${
    //     params.returnflowSubTradeNo
    //   }`, // 还机详情, 1是门店，2是邮寄
    //   event: TrackEventMyCenter.RemandDetails,
    // },
    17: {
      // link: `/myaccount/return/apply/express?returnflow_trade_no=${params.returnflowTradeNo}`, // 还机申请
      event: TrackEventMyCenter.ApplyForRemand,
    },
    24: {
      event: TrackEventMyCenter.ExtraInfo, // 补充资料页
    },
    25: {
      event: TrackEventMyCenter.ApplyForWithHold, // 继续申请（签代扣页面）
    },
  }
  const buttonType = +params.buttonType
  if (dicLink[buttonType] && dicLink[buttonType].event) {
    trackClickEvent(dicLink[buttonType].event) // piwik 事件统计
  } else {
    Toast.info('检测到无效的piwik事件')
  }
  if (buttonType === BUTTON_TYPE.TERMINATION_SERVICE) {
    return // 终止服务只统计piwik事件，没有操作事件
  }
  const linkUrl = dicLink[buttonType].link
  if (params.isSmallApp) {
    if (isWechat()) {
      Toast.info('请下载享换机APP完成此操作')
    } else {
      location.href = `alipays://platformapi/startApp?appId=2018041702573084&page=page/account/orderdetail/index?orderNo=${
        params.contractNo
      }`
    }
  } else if (linkUrl) {
    // 没有资格判断时直接跳转
    await Router.push(linkUrl)
  } else if ([24, 25].includes(buttonType)) {
    dispatch(
      createStrategyPay({
        trade_no: params.tradeNo,
        pay_no: params.payNo,
        pis_code: params.pisCode,
      }),
    )
  } else {
    const url = 'node-api/account/service/list/checkBtnStatus'
    const headers = getHeaders2()
    try {
      const { data } = await axios.get<ErrorReturn & CheckReplaceMent & CheckReturnStatus & CheckBuyOutStatus>(url, {
        params: { button_type: params.buttonType, contract_no: params.contractNo },
        headers,
      })
      if (data.errorMsg) {
        Toast.info(data.errorMsg)
      }
      if (+params.buttonType === BUTTON_TYPE.EXCHANGE_DO) {
        // 立即换机资格判断
        if (data.is_replace_role) {
          await Router.push('/product/category')
        } else {
          Modal.alert(data.title || '', data.msg, [{ text: '我知道了' }], 'android')
        }
      } else if (+params.buttonType === BUTTON_TYPE.BUY_OUT_APPLY) {
        // 立即买断资格判断
        if ([1, 2].includes(data.return_status)) {
          // await Router.push(`/myaccount/service/buy-out?trade_no=${params.tradeNo}`) // 新买断，暂时没用
          window.location.href = `/trade/buy?trade_no=${params.tradeNo}` // 旧买断
        } else {
          Modal.alert(data.title || '', data.msg, [{ text: '我知道了' }], 'android')
        }
      } else if (+params.buttonType === BUTTON_TYPE.RETUREN_APPLY) {
        // 还机申请资格判断
        if (data.return_status === 1) {
          // 正常还机，跳转至还机申请页
          // window.location.href = `/myaccount/return/apply/express?returnflow_trade_no=${params.returnflowTradeNo}`
          window.location.href = `/returnflow/store-return-index/${params.tradeNo}?ahs_city_id=0&ahs_store_id=0`
        } else if (data.return_status === 2) {
          // 提前还机，跳转至还机费用说明页
          // ?newExpress=false
          await Router.push(`/returnflow/returncost/${params.tradeNo}`)
        } else if (data.return_status === 6) {
          // 已提交还机申请, 跳转至还机详情页(注：押金转代扣失败 等待人工操作) //质检未通过
          window.location.href = `/returnflow/returndetailmain/${params.returnflowTradeNo}`
        } else {
          Modal.alert(data.title, data.msg, [{ text: '我知道了' }], 'android')
        }
      }
    } catch (err) {
      tools.ErrorLog(err)
    }
  }
}
