import { Router } from 'express'
import { query } from 'express-validator/check'
import { getStoreCity, getStoreDetail, getStoreSelect } from '../../controllers/trade/guangzhou'
import { handler } from '../../utils/router'

const router = Router()

router.get('/city', [query('operator_channel').exists()], handler(getStoreCity))
router.get('/detail', [query('store_code').exists()], handler(getStoreDetail))
router.get('/select', [query('city_id').exists()], handler(getStoreSelect))

export default router
