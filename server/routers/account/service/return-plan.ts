import { Router } from 'express'
import { body } from 'express-validator/check'
import { getContractPlanList, pay } from '../../../controllers/account/service/return-plan'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/', handler(getContractPlanList))
router.post('/pay', [body('redirect').exists(), body('plan_id').exists(), body('trade_no').exists()], handler(pay))

export default router
