import { Router } from 'express'
import { query } from 'express-validator/check'
import {
  bindCard,
  bindOTP,
  bindOTPRepeat,
  getAuthorizeResult,
  getFundingResult,
} from '../../controllers/trade/fundsUnion'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get(
  '/bindOTP',
  auth,
  [
    query('payNo').exists(),
    query('idCard').exists(),
    query('userName').exists(),
    query('tel').exists(),
    query('cardNo').exists(),
  ],
  handler(bindOTP),
)
router.get('/bindOTPRepeat', auth, [query('OTPBillNo').exists()], handler(bindOTPRepeat))
router.get('/bindCard', auth, [query('OTPBillNo').exists(), query('verifyCode').exists()], handler(bindCard))
router.get('/getAuthorizeResult', auth, [query('trade_no').exists()], handler(getAuthorizeResult))
router.get(
  '/getFundingResult',
  auth,
  [query('trade_no').exists(), query('return_url').exists()],
  handler(getFundingResult),
)

export default router
