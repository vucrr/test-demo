import { Request } from 'express'
import { CheckTradeDoneReturns, NavIconsReturns } from '../interfaces/common'
import { RouterRequest } from '../interfaces/router'
import { FileReturns } from '../interfaces/upload'
import commonModel from '../models/common'
import Resource from '../utils/resource'
import { BFA_Returns, ErrorLog, errorHandler } from '../utils/tools'

export async function checkToken(req: any): Promise<any> {
  const res = await commonModel.checkToken(req)
  if (res && res.status === 0) {
    return res.data
  }
  return errorHandler(res)
}

export async function uploadToOSS(req: RouterRequest): Promise<void | FileReturns> {
  // base64
  if (typeof req.body.file === 'string') {
    const res = await commonModel.upload<FileReturns>(req)
    return BFA_Returns(res)
  }
}

export async function sendDingTalkError(req: RouterRequest): Promise<any> {
  ErrorLog(`${req.body.isClient ? 'client' : 'server'} error -- ${req.body.content}`, req.body.isClient)
  return { success: true }
}

export async function getNavIcons(req: RouterRequest): Promise<NavIconsReturns> {
  const res = await commonModel.getNavIcons<NavIconsReturns>(req)
  return BFA_Returns(res)
}

export async function getChannelId(req: Request): Promise<{ channel_id: number }> {
  req.headers = { ...req.headers, ...Resource.buildHeaders(req, true) }
  const res = await commonModel.getChannelId<NavIconsReturns>(req)
  return BFA_Returns(res)
}

export async function checkTradeDone(req: RouterRequest): Promise<NavIconsReturns> {
  const res = await commonModel.checkTradeDone<CheckTradeDoneReturns>(req)
  return BFA_Returns(res)
}
