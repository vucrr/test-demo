import { Router } from 'express'
import { extraInfo } from '../../controllers/trade/extraInfo'
import { handler } from '../../utils/router'

const router = Router()

router.get('/list', handler(extraInfo))

export default router
