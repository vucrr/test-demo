export interface ErrorReturn {
  status: number
  errorMsg?: string
}

export interface ListCategoryReturns {
  categorys: {
    tag: number
    name: string
  }[]
  manufacturers: {
    id: number
    name: string
  }[]
  products: {
    assurance: number
    baseFee: number
    id: number
    id_product: number
    imgUrl: string
    manufacturer_id: number
    price: number
    tag: number
    title: string
  }[]
  info: {
    manufacturer: number
    tag: number
  }
}

export interface DetailInfoReturns extends ErrorReturn {
  carouselList: {
    file_name: string
  }[]
  activity: {
    id: number
    title: string
    activity_img: string
    product_introduce_img: string
    start_time: string
    end_time: string
    ahs_subsidies: string
    id_product: number
    product_name: string
    status: number
    dt_created: string
    dt_updated: null | string
    need_code: number
    active: number
    days_per_installments: null
    min_installments_num: null
    max_installments_num: null
    product_wide_img: string
    img_count: number
    small_img: string
    shop_count: number
    id_category_default: {
      id_category_default: number
    }
    auto_rent_amount: string
  }
  popupInfo: {
    property_list: {
      id: number
      name: string
    }[]
    available_value_ids: number[]
    installments_info: number[]
    services: {}[]
  }
  info: {
    id_activity: number
    channel_id: number
    is_zhima: boolean
    pagetitle: string
  }
  recommendProducts: {
    id: number
    title: string
    price: number
    tag: string
    assurance: string
    imgUrl: string
    baseFee: string
    render: boolean
  }[]
}

export interface Property {
  id: number
  name: string
  values: {
    [index: string]: {
      id: string
      value: string
      available: number
      selected: number
    }
  }
}

export type PropertyDict = {
  [index: string]: Property
}

export interface PropertyObject {
  id: number
  name: string
  values: {
    id: string
    value: string
    available: number
    selected: number
  }[]
}

export interface ReceiveInfoReturns {
  id: number
  product_name: string
  product_introduce_img: string
}
