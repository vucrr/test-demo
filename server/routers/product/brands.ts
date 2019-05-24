import { Router } from 'express'
import { query } from 'express-validator/check'
import { listBrands } from '../../controllers/product/list-brands'
// import cache from '../../middlewares/apiCache'
import { handler } from '../../utils/router'

const router = Router()

// const checkString = (value: string) => !value || value.length > 0

router.get('/', [query('brand_id').exists()], handler(listBrands))

export default router
