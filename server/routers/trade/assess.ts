import { Router } from 'express'
import { query } from 'express-validator/check'
import {
  emergencyContact,
  finishCreditEntrydata,
  getAppraiseResult,
  gpsFlow,
  tongdunStatistics,
} from '../../controllers/trade/assess'
import { RouterRequest } from '../../interfaces/router'
import { auth } from '../../middlewares/auth'
import config from '../../utils/config'
import { handler } from '../../utils/router'

const router = Router()

const parseAppraiseResultReq = (req: RouterRequest) => ({
  headers: req.headers,
  query: {
    ...req.query,
    return_url: `${config.host}mytrade/order/result?trade_no=${req.query.trade_no}`,
  },
})

router.get(
  '/result',
  auth,
  [
    query('trade_no')
      .exists()
      .isInt(),
  ],
  handler(getAppraiseResult, parseAppraiseResultReq),
)

router.post('/gpsFlow', auth, [], handler(gpsFlow))
router.post('/tongDunData', auth, [], handler(tongdunStatistics))
router.post('/emergencyContact', auth, [], handler(emergencyContact))
router.post('/finishCreditEntrydata', auth, [], handler(finishCreditEntrydata))
export default router
