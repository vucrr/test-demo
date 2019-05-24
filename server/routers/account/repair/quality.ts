import { Router } from 'express'
import { query } from 'express-validator/check'
import { getRepairQualityDetail, getRepairQualityRecord } from '../../../controllers/account/repair/quality'
import { handler } from '../../../utils/router'

const router = Router()

router.get('/record', [query('trade_no').exists()], handler(getRepairQualityRecord))
// 维修详情页接受参数 sn=xxx || trade_no=xxx
router.get('/detail', [], handler(getRepairQualityDetail))

export default router
