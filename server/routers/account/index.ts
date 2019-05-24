import { Router } from 'express'
import autoRent from './auto-rent'
import bindPhone from './bindPhone'
import bindWechat from './bindWechat'
import buyOut from './buy-out'
import center from './center'
import footprint from './footprint'
import privilege from './privilege'
import receipt from './receipt'
import repair from './repair'
import returnApply from './return'
import returnPhone from './returnPhone'
import returnflow from './returnflow'
import service from './service'
import termsList from './termsList'
import unionPay from './unionPay'

const router = Router()

router.use('/center', center)
router.use('/returnflow', returnflow)
router.use('/repair', repair)
router.use('/privilege', privilege)
router.use('/footprint', footprint)
router.use('/unionPay', unionPay)
router.use('/auto-rent', autoRent)
router.use('/bind_phone', bindPhone)
router.use('/buy-out', buyOut)
router.use('/bind_wechat', bindWechat)
router.use('/return_phone', returnPhone)
router.use('/service', service)
router.use('/termsList', termsList)
router.use('/receipt', receipt)
router.use('/return', returnApply)

export default router
