import { Router } from 'express'
import { query } from 'express-validator/check'
import BindWechat from '../../controllers/account/bindWechat'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get(
  '/configuration',
  [query('action').equals('getRedirectUrl'), query('sourceCode').exists()],
  handler(BindWechat.getConfiguration),
)

router.get('/unbind', auth, [query('action').equals('unbindWeixin')], handler(BindWechat.unbindWechat))

router.get('/result', auth, [query('action').equals('getRedirectUrl')], handler(BindWechat.getBindResult))

export default router
