export interface ErrorReturn {
  status: number
  code?: number
  errorMsg?: string
}

export interface ErrorObject {
  error: ErrorReturn
}
