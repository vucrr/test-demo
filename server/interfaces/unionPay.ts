export interface UnionPayFormReturn {
  realName: string
  idNo: string
  bankCardNo?: string
  tel?: string
  tradeNo?: string
  bankName?: string
}

export interface UnionPayItemReturn {
  id: string
  realName: string
  idNo: string
  bankCardNo?: string
  tel?: string
  tradeNo?: string
  icon?: string
  bankName?: string
  // 协议号
  protocolNo?: string
  backImg: string
  cardDesc: string
  card?: string
}

export type UnionPayListReturn = UnionPayItemReturn[]

export interface UnionPayBankItemReturn {
  id: string
  bank_icon: string
  back_img: string
  bank_name: string
  tableSuffix?: string
}

export type UnionPayBankListReturn = UnionPayBankItemReturn[]
