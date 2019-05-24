import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import productModel from '../../models/product'
import { BFA_Returns, ErrorLog, errorHandler } from '../../utils/tools'

export async function getInfo(req: RouterRequest): Promise<ErrorReturn | any> {
  const response = await productModel.getDetail<any>(req)

  if (response && response.code === 200) {
    const {
      image_list: imageList,
      rent_plan: rentPlan,
      discount_list: discountList,
      promotion_list: promotionList,
      service_promise: servicePromise,
      rent_process: rentProcess,
      common_question_list: commonQuestionList,
      product_param: productParam,
      detail_image_list: detailImageList,
      new_order_info: newOrderInfo,
      ...info
    } = response.data
    return {
      imageList,
      rentPlan,
      discountList,
      promotionList,
      servicePromise,
      rentProcess,
      commonQuestionList,
      productParam,
      detailImageList,
      newOrderInfo,
      info,
    }
  }
  return errorHandler(response)
}

export async function getProperty(req: RouterRequest): Promise<ErrorReturn | any> {
  const propertyRes = await productModel.getProperty<any>(req)

  if (propertyRes && propertyRes.code === 200) {
    const {
      property_list: propertyList,
      check_list: checkList,
      rent_list: rentList,
      vas_list: vasList,
      ...info
    } = propertyRes.data
    return {
      propertyList,
      checkList,
      rentList,
      vasList,
      info,
    }
  }
  return errorHandler(propertyRes)
}

export async function getStock(req: RouterRequest): Promise<ErrorReturn | any> {
  const stockRes = await productModel.getStock(req)
  if (stockRes && stockRes.code === 200) {
    return { stockList: stockRes.data }
  }
  return errorHandler(stockRes)
}

interface SaveRedirectUrlReturns {
  call_auth_url?: string
  msg?: string
}

export async function saveRedirectUrl(req: RouterRequest): Promise<SaveRedirectUrlReturns> {
  const res = await productModel.redirect<SaveRedirectUrlReturns>(req)
  if (res && res.status === 0) {
    if (res.data && res.data.call_auth_url) {
      return res.data
    }
  } else {
    ErrorLog(`post userOauth/saveRedirectUrl headers.cookie: ${req.headers.cookie}`)
  }
  return { msg: '服务器报错了' }
}

export async function notice(req: RouterRequest): Promise<ErrorReturn | boolean> {
  const res = await productModel.notice<boolean>(req)
  return BFA_Returns(res)
}
