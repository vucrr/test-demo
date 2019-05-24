import { Router } from 'express'
import { query } from 'express-validator/check'
import { getLBFAgreement, getServiceAgreement } from '../../controllers/account/termsList'
import { handler } from '../../utils/router'

const router = Router()

router.get('/', [query('trade_no').exists()], handler(getServiceAgreement))
router.get('/getLbfAgreement', [query('trade_no').exists()], handler(getLBFAgreement))

export default router
