/*
* 这个文件使用来处理各种只重定向的业务
* 不需要前端发请求，而服务端直接处理，然后跳转
* */

import { Router } from 'express'
import certification from './certification'
import trade from './trade'

const router = Router()

router.use('/certification', certification)
router.use('/trade', trade)

export default router
