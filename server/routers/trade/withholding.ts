import { Router } from 'express'
import { body, query } from 'express-validator/check'
import WithholdingCtrl from '../../controllers/trade/withholding'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/list', auth, [query('trade_no').exists()], handler(WithholdingCtrl.listWithhold))
router.get('/list_signs', auth, handler(WithholdingCtrl.listSigns))
router.get('/validate', auth, handler(WithholdingCtrl.validateIfCanUnSign))
router.post('/sign', auth, [body('type').exists(), body('return_url').exists()], handler(WithholdingCtrl.sign))
router.post('/un_sign', auth, [body('agreement_no').exists(), body('type').exists()], handler(WithholdingCtrl.unSign))

export default router
