import { ErrorReturn } from '../../interfaces/error'
import { PriceReturns, ReturnPhoneDetail } from '../../interfaces/returnPhone'
import { RouterRequest } from '../../interfaces/router'
import returnPhone from '../../models/returnPhone'
import { BFA_Returns, errorHandler } from '../../utils/tools'

interface City {
  firstLetter: string
  city_name: string
  city_id: number
}

interface CityReturns {
  [index: string]: {
    label: string
    value: number
  }[]
}

export default class ReturnPhoneCtrl {
  static async getPrice(req: RouterRequest) {
    const res = await returnPhone.getReturnPrice<PriceReturns>(req)
    return BFA_Returns(res)
  }

  static async apply(req: RouterRequest): Promise<any | ErrorReturn> {
    const res = await returnPhone.applyReturnPhone<any>(req)
    return BFA_Returns(res)
  }

  static async listAhsCity(req: RouterRequest): Promise<any | ErrorReturn> {
    const res = await returnPhone.listAhsCity<any>(req)
    if (res.status === 101) {
      const allCities: CityReturns = {}
      res.data.all_citys.forEach((city: City) => {
        if (!allCities[city.firstLetter]) {
          allCities[city.firstLetter] = []
        }
        allCities[city.firstLetter].push({
          label: city.city_name,
          value: city.city_id,
        })
      })
      return {
        all: allCities,
        hot: res.data.hot_citys.map((c: City) => ({ label: c.city_name, value: c.city_id })),
      }
    }
    return errorHandler(res)
  }

  static async listAhsCityRegion(req: RouterRequest): Promise<any | ErrorReturn> {
    const res = await returnPhone.listAhsCityRegion(req)
    return BFA_Returns(res)
  }

  static async listAhsStore(req: RouterRequest): Promise<any | ErrorReturn> {
    const res = await returnPhone.listAhsStore(req)
    return BFA_Returns(res)
  }

  static async getAhsStoreById(req: RouterRequest): Promise<any | ErrorReturn> {
    const res = await returnPhone.getAhsStore(req)
    return BFA_Returns(res)
  }

  static async getDetail(req: RouterRequest) {
    const res = await returnPhone.getReturnDetail<ReturnPhoneDetail>(req)
    return BFA_Returns(res)
  }

  static async cancelApply(req: RouterRequest) {
    const res = await returnPhone.cancelApply<ReturnPhoneDetail>(req)
    return BFA_Returns(res)
  }
}
