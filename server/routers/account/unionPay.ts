import { Router } from 'express'
import { body, query } from 'express-validator/check'
import {
  binCheck,
  bindApply,
  bindCancel,
  bindConfirm,
  bindSms,
  getCheckBanklist,
  getDetail,
  getForm,
  getList,
} from '../../controllers/account/unionPay'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/list', auth, handler(getList))
router.get('/detail', auth, [query('protocolNo').exists()], handler(getDetail))
router.get('/checkBanklist', auth, handler(getCheckBanklist))
router.get('/form', auth, handler(getForm))
router.post(
  '/bindApply',
  auth,
  [
    body('bankCardNo').exists(),
    body('idNo').exists(),
    body('realName')
      .trim()
      .exists(),
    body('tel')
      .exists()
      .isMobilePhone('zh-CN'),
  ],
  handler(bindApply),
)
router.post('/bindSms', auth, [body('tradeNo').exists()], handler(bindSms))
router.post('/bindConfirm', auth, [body('tradeNo').exists(), body('verifyCode').exists()], handler(bindConfirm))
router.post(
  '/bindCancel',
  auth,
  [
    body('protocolNo').exists(),
    body('bankCardNo').exists(),
    body('idNo').exists(),
    body('realName')
      .trim()
      .exists(),
    body('tel')
      .exists()
      .isMobilePhone('zh-CN'),
  ],
  handler(bindCancel),
)
router.post('/binCheck', auth, [body('cardBin').exists()], handler(binCheck))

export default router
