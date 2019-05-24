import { Router } from 'express'
import path from 'path'
import {
  getZmfaceCertifyResult,
  getZmxyCertifyResult,
  postCertifyUrl,
  postUserIdentity,
} from '../../controllers/trade/certification'
import Resource from '../../utils/resource'
import { getUA } from '../../utils/tools'

const router = Router()

// 芝麻信用套餐
router.get('/zmxy', async function(req, res) {
  const headers = Resource.buildHeaders(req, true)
  req.headers = headers

  const ua = getUA(req.useragent!.source, +headers.channelid)
  let channel
  if (ua.isApp) {
    channel = 'xhjapp'
  } else if (ua.isAlipay) {
    channel = 'alipay'
  }

  req.body = {
    redirect: req.query.redirect || '/',
    channel,
  }
  const result = await postCertifyUrl(req)
  if (result.status && result.errorMsg) {
    return res.sendFile(path.resolve(__dirname, './error.html'))
  }
  // 重定向
  res.redirect(result.zm_url)
})

const getResult = async (req: any, res: any, modal: any, type?: string) => {
  req.headers = Resource.buildHeaders(req, true)
  if (type === 'zmface') {
    const { biz_no } = JSON.parse(req.query.biz_content)
    req.query = {
      biz_no,
    }
  }
  // 获取结果
  const result = await modal(req)
  if (result.status && result.errorMsg) {
    return res.sendFile(path.resolve(__dirname, './error.html'))
  }
  // 保存用户信息
  const { token } = result
  req.query = {
    token,
  }
  await postUserIdentity(req)
  // 重定向
  res.redirect(result.redirect)
}

// 信用套餐查询
router.get('/zmxy/result', async function(req, res) {
  await getResult(req, res, getZmxyCertifyResult)
})

router.get('/zmxy/result/auth/zhima', async function(req, res) {
  await getResult(req, res, getZmxyCertifyResult)
})

// 芝麻扫脸查询
router.get('/zmface/result', async function(req, res) {
  await getResult(req, res, getZmfaceCertifyResult, 'zmface')
})

router.get('/zmface/result/auth/zhima', async function(req, res) {
  await getResult(req, res, getZmfaceCertifyResult, 'zmface')
})

export default router
