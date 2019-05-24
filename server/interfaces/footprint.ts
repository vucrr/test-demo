export interface FootPrintReturns {
  name: string
  user_id: string
  source: string
  identi_card: string
  credit_level: string
  honour_count: number
  breach_count: number
  honour: Breach
  breach: Breach
}
interface Breach {
  return_pay: number
  return_machine: number
  buyout: number
}
export interface FootPrintListReturns {
  overdue: string
}
