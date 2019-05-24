export interface PrivilegeListItem {
  id: string
  user_priv_id: string
  title: string
  type: string
  desc: string
  img: string
  status: string
  started_at: string
  expired_at: string
}
export interface UserPrivilegeItem {
  title: string
  desc: string
  user_priv_id: number
  redeem_code: string
  started_at: string
  expired_at: string
}

export type PrivilegeListReturns = PrivilegeListItem[]

export type UserPrivilegeReturns = UserPrivilegeItem[]
