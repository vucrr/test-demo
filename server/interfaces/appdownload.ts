export interface TopLevel {
  status: number
  data: DataReturns
}

export interface DataReturns {
  appDownloadUrl: AppDownloadURL
  hot: Hot[]
  pagetitle: string
}

export interface ProceedReturns {
  appDownloadUrl: AppDownloadURL
  pagetitle: string
}
interface AppDownloadURL {
  android: string
  ios: string
}

interface Hot {
  id: number
  title: string
  assurance: number
  price: number
  imgUrl: string
  tag: number
}
