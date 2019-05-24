import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import {
  UnionPayBankListReturn,
  UnionPayFormReturn,
  UnionPayItemReturn,
  UnionPayListReturn,
} from '../../interfaces/unionPay'
import unionPayModel from '../../models/unionPay'
import { BFA_Returns, errorHandler } from '../../utils/tools'

function renderItem(item: any): UnionPayItemReturn {
  return {
    id: item.id,
    realName: item.name,
    idNo: item.identi_card,
    bankCardNo: item.card_no,
    tel: item.phone,
    tradeNo: item.trade_no,
    icon: item.bank_icon,
    backImg: item.back_img,
    cardDesc: item.card_desc,
    bankName: item.bank_name,
    protocolNo: item.protocol_no,
    card: item.card,
  }
}

export async function getList(req: RouterRequest): Promise<ErrorReturn | UnionPayListReturn> {
  const res = await unionPayModel.getList<UnionPayListReturn>(req)
  // 特殊处理
  if (res && res.code === 200) {
    return res.data.map(renderItem)
  }
  return errorHandler(res)
}

export async function getDetail(req: RouterRequest): Promise<ErrorReturn | UnionPayFormReturn> {
  const res = await unionPayModel.getDetail<UnionPayFormReturn>(req)
  // 特殊处理
  if (res && res.code === 200) {
    return renderItem(res.data)
  }
  return errorHandler(res)
}

interface UnionPayDetailReturn {
  user_id: string
  name: string
  identi_card: string
  phone: string
}

export async function getCheckBanklist(req: RouterRequest): Promise<ErrorReturn | UnionPayBankListReturn> {
  const res = await unionPayModel.getCheckBanklist<UnionPayBankListReturn>(req)
  return BFA_Returns(res)
}

export async function getForm(req: RouterRequest): Promise<ErrorReturn | UnionPayFormReturn> {
  const res = await unionPayModel.getForm<UnionPayDetailReturn>(req)
  // 特殊处理
  if (res && res.code === 200) {
    return {
      realName: res.data.name,
      idNo: res.data.identi_card,
    }
  }
  return errorHandler(res)
}

export async function bindApply(req: any): Promise<ErrorReturn | any> {
  const res = await unionPayModel.bindApply(req)
  return BFA_Returns(res)
}

export async function bindSms(req: any): Promise<ErrorReturn | any> {
  const res = await unionPayModel.bindSms(req)
  return BFA_Returns(res)
}

export async function bindConfirm(req: any): Promise<ErrorReturn | any> {
  const res = await unionPayModel.bindConfirm(req)
  return BFA_Returns(res)
}

export async function bindCancel(req: any): Promise<ErrorReturn | any> {
  const res = await unionPayModel.bindCancel(req)
  return BFA_Returns(res)
}

export async function binCheck(req: any): Promise<ErrorReturn | any> {
  const res = await unionPayModel.binCheck(req)
  return BFA_Returns(res)
}
