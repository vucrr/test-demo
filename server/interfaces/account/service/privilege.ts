export interface Privilege {
  title: string
  img_url: string
  content: string
  type: number
  operation_type: number
  button_name: string
  link: string
}

export type PrivilegeListReturns = Privilege[]
