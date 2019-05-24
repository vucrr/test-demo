import { Router } from 'express'
import { exchangeCoupon, getCouponInfo } from '../../controllers/activitys/exchangecoupon'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', handler(exchangeCoupon))
router.get('/info', handler(getCouponInfo))

export default router
