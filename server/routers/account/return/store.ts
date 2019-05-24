import { Router } from 'express'
import { query } from 'express-validator/check'
import {
  applyReturn,
  cancelApplyByStore,
  fetchApplyResultByStore,
  fetchStoreReturnDetail,
} from '../../../controllers/account/return/store'
import { auth } from '../../../middlewares/auth'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/detail', auth, [query('trade_no').exists()], handler(fetchStoreReturnDetail))
router.get(
  '/apply',
  auth,
  [query('trade_no').exists(), query('user_phone').exists(), query('ahs_store_id').exists()],
  handler(applyReturn),
)
router.get('/cancel', auth, [query('sub_trade_no').exists()], handler(cancelApplyByStore))
router.get('/result', auth, [query('sub_trade_no').exists()], handler(fetchApplyResultByStore))

export default router
