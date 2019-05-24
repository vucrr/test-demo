import { ErrorReturn } from '../interfaces/error'
import { HomeDataReturns, HomeNgcacheReturns, Popup, UserInfo, UserTagReturns } from '../interfaces/home'
import { RouterRequest } from '../interfaces/router'
import homeModel from '../models/home'
import { BFA_Returns, checkLogin, errorHandler } from '../utils/tools'

class HomeCtrl {
  static async receiveHomeData(req: RouterRequest): Promise<HomeDataReturns | ErrorReturn> {
    // 四川移动的处理
    let userInfo
    if (req.query.p) {
      const loginReq = req
      loginReq.query.mobile = loginReq.query.p
      delete loginReq.query.p
      const resLoginInfo = await homeModel.loginForSCMobile<UserInfo>(loginReq)
      if (resLoginInfo && resLoginInfo.code === 200) {
        userInfo = resLoginInfo.data
      } else {
        return errorHandler(resLoginInfo)
      }
    }

    const [res, resAd] = await Promise.all([
      homeModel.listHome<HomeNgcacheReturns>(req),
      homeModel.getHomeAd<Popup>(req),
    ])
    if (res.code === 200 && resAd.code === 200) {
      return { ...res.data, popup: resAd.data, userInfo }
    } else {
      return errorHandler(res || resAd)
    }
  }

  static async getUserTag(req: RouterRequest): Promise<UserTagReturns> {
    if (checkLogin(req)) {
      const res = await homeModel.getUserTag<UserTagReturns>(req)
      return BFA_Returns(res)
    } else {
      const res = await homeModel.getNotLoginUserTag<UserTagReturns>(req)
      return BFA_Returns(res)
    }
  }
}

export default HomeCtrl
