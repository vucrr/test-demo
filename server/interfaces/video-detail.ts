export interface VideoDetailReturns {
  video: Video
  video_product: any[]
  recommend_products: Array<RecommendProduct[]>
}

export interface RecommendProduct {
  id_product: number
  id_activity: number
  id_sku: number
  installments_num: number
  name: string
  price: string
  contract_charge: string
  title: string
  activity_img: string
  img: string
  perMonthPrice: number
}

export interface Video {
  url: string
  title: string
  desc: string
  views: string
  duration: string
  pic: string
}
