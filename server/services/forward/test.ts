import { Router } from 'express'
import path from 'path'
// import { listPrivileges } from '../../controllers/account/privilege'
import Resource from '../../utils/resource'
// import { getUA } from '../../utils/tools'

const router = Router()

router.get('/', async function(req, res) {
  // 构造 headers
  const headers = Resource.buildHeaders(req, true)
  req.headers = headers
  // e.g. 向 BFA 请求，调用 Controller 方法
  // const result = await listPrivileges(req)
  // const ua = getUA(req.useragent!.source, +headers.channelid)
  // console.log(ua, '[ua]')
  // console.log(result, '[result]')
  // 重定向
  // res.redirect('/')
  res.sendFile(path.resolve(__dirname, './error.html'))
})

export default router
