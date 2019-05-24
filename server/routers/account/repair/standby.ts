import { Router } from 'express'
import { query } from 'express-validator/check'
import { getStandbyQualityDetail, getStandbyQualityRecord } from '../../../controllers/account/repair/standby'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/record', [query('trade_no').exists()], handler(getStandbyQualityRecord))
router.get('/detail', [query('sn').exists()], handler(getStandbyQualityDetail))

export default router
