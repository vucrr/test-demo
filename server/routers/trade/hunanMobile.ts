import { Router } from 'express'
import { checkWhiteList, getRecommendPhone, lockPhone, searchPhone } from '../../controllers/trade/hunanMobile'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/checkWhiteList', auth, handler(checkWhiteList))
router.get('/getRecommendPhone', auth, handler(getRecommendPhone))
router.get('/lockPhone', auth, handler(lockPhone))
router.get('/searchPhone', auth, handler(searchPhone))

export default router
