import { Router } from 'express'
import { query } from 'express-validator/check'
import {
  cancelReturn,
  changePickUp,
  commitApplyReturn,
  createExpressReturnBill,
  getApplyResult,
  getLogistics,
  getReturnDetail,
  getSchedule,
  isAddressAvailable,
} from '../../../controllers/account/return/express'
import { auth } from '../../../middlewares/auth'
import { handler } from '../../../utils/router'

const router = Router()

const applyQuery = [
  query('trade_no').exists(),
  query('type')
    .exists()
    .isInt(),
  query('user_phone').exists(),
  query('express_number').optional(),
  query('name').optional(),
  query('city').optional(),
  query('county').optional(),
  query('address').optional(),
  query('detail_address').optional(),
  query('house_number').optional(),
  query('lat').optional(),
  query('long').optional(),
  query('time').optional(),
]

router.get('/returnDetail', auth, [query('trade_no').exists()], handler(getReturnDetail))
router.get('/cancel', auth, [query('sub_trade_no').exists()], handler(cancelReturn))
router.get('/createBill', auth, applyQuery, handler(createExpressReturnBill))
router.get('/commitApplyReturn', auth, applyQuery, handler(commitApplyReturn))
router.get('/result', auth, [query('sub_trade_no').exists()], handler(getApplyResult))

router.get(
  '/isAddressAvailable',
  auth,
  [query('province').exists(), query('city').exists(), query('county').exists(), query('address').exists()],
  handler(isAddressAvailable),
)

router.get('/getSchedule', auth, handler(getSchedule))

router.get('/changePickUp', auth, [query('sub_trade_no').exists(), query('time').exists()], handler(changePickUp))

router.get('/getLogistics', auth, [query('sub_trade_no').exists()], handler(getLogistics))

export default router
