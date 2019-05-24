import { DataReturns, ProceedReturns } from '../../interfaces/appdownload'
import { ErrorReturn } from '../../interfaces/error'
import { RouterRequest } from '../../interfaces/router'
import siteModel from '../../models/site'

export async function appDownload(req: RouterRequest): Promise<ErrorReturn | DataReturns> {
  const res = await siteModel.appDownload<DataReturns>(req)
  return res.data
}

export async function appDownloadProceed(req: RouterRequest): Promise<ErrorReturn | ProceedReturns> {
  const res = await siteModel.appDownloadProceed<ProceedReturns>(req)
  return res.data
}
