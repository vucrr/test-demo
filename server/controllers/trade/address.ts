import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import { AddressForm, ChangeForm, CityList } from '../../interfaces/trade'
import tradeResource from '../../models/trade'
import { BFA_Returns } from '../../utils/tools'

interface ListViewData {
  [index: string]: { label: string; value: string }[]
}

function genListViewData(allCities: CityList['all_citys']): ListViewData {
  const result: ListViewData = {}
  allCities.forEach(city => {
    const obj = {
      label: city.city_name,
      value: city.city_name,
    }
    if (!result[city.firstLetter]) {
      result[city.firstLetter] = []
    }
    result[city.firstLetter].push(obj)
  })
  return result
}

export default class AddressCtrl {
  static async getCityList(req: RouterRequest) {
    const res = await tradeResource.getCityList(req)
    const data: CityList = BFA_Returns(res)
    const all = genListViewData(data.all_citys)
    return { ...data, all_citys: all }
  }

  static async getAddressForm(req: RouterRequest): Promise<ErrorReturn | AddressForm> {
    const res = await tradeResource.getAddressForm<any>(req)
    return BFA_Returns(res)
  }

  static async setAddressForm(req: RouterRequest): Promise<ErrorReturn | ChangeForm> {
    const res = await tradeResource.setAddressForm<any>(req)
    return BFA_Returns(res)
  }
}
