import { Router } from 'express'
import exchangecoupon from './exchangecoupon'
import guideOldUser from './guideOldUser'

const router = Router()

router.use('/exchangecoupon', exchangecoupon)
router.use('/guideOldUser', guideOldUser)

export default router
