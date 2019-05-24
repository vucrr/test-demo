import { Router } from 'express'
import { body, query } from 'express-validator/check'
import { getInfo, getResultInfo, submit } from '../../../controllers/account/service/cancel'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/info', [query('contract_no').exists(), query('type').exists()], handler(getInfo))

router.get('/result', [query('trade_no').exists(), query('type').exists()], handler(getResultInfo))

router.post(
  '/submit',
  [body('contract_no').exists(), body('reason_id').exists(), body('reason_dec').exists()],
  handler(submit),
)

export default router
