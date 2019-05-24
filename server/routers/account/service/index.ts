import { Router } from 'express'
import { auth } from '../../../middlewares/auth'
import cancel from './cancel'
import detail from './detail'
import list from './list'
import orderRecord from './order-record'
import privilege from './privilege'
import returnPlan from './return-plan'

const router = Router()

router.use('/list', auth, list)
router.use('/cancel', auth, cancel)
router.use('/detail', auth, detail)
router.use('/return-plan', auth, returnPlan)
router.use('/privilege', auth, privilege)
router.use('/order-record', auth, orderRecord)

export default router
