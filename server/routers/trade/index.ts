import { Router } from 'express'
import address from './address'
import assess from './assess'
import certification from './certification'
import creditCard from './creditCard'
import creditevaluation from './creditevaluation'
import exchange from './exchange'
import extraInfo from './extraInfo'
import fundsUnion from './fundsUnion'
import guangzhou from './guangzhou'
import hunanMobile from './hunanMobile'
import order from './order'
import user from './user'
import withholding from './withholding'

const router = Router()

router.use('/order', order)
router.use('/guangzhou', guangzhou)
router.use('/user', user)
router.use('/certification', certification)
router.use('/assess', assess)
router.use('/address', address)
router.use('/hunanMobile', hunanMobile)
router.use('/fundsUnion', fundsUnion)
router.use('/exchange', exchange)
router.use('/withholding', withholding)
router.use('/creditCard', creditCard)
router.use('/extraInfo', extraInfo)
router.use('/creditevaluation', creditevaluation)

export default router
