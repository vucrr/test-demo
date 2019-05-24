import { Router } from 'express'
import { query } from 'express-validator/check'
import ReturnPhoneCtrl from '../../controllers/account/returnPhone'
import { auth } from '../../middlewares/auth'
import { handler } from '../../utils/router'

const router = Router()

router.get('/price', auth, handler(ReturnPhoneCtrl.getPrice))
router.get('/apply', auth, handler(ReturnPhoneCtrl.apply))
router.get('/city', auth, handler(ReturnPhoneCtrl.listAhsCity))
router.get('/region', auth, [query('ahs_city_id').exists()], handler(ReturnPhoneCtrl.listAhsCityRegion))
router.get(
  '/store',
  auth,
  [query('ahs_city_id').exists(), query('ahs_region_id').exists()],
  handler(ReturnPhoneCtrl.listAhsStore),
)
router.get('/store_detail', auth, [query('ahs_store_id').exists()], handler(ReturnPhoneCtrl.getAhsStoreById))
router.get('/detail', auth, handler(ReturnPhoneCtrl.getDetail))
router.get('/cancel', auth, handler(ReturnPhoneCtrl.cancelApply))

export default router
