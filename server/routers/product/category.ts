import { Router } from 'express'
import { query } from 'express-validator/check'
import { listCategory } from '../../controllers/product/category'
// import cache from '../../middlewares/apiCache'
import { handler } from '../../utils/router'

const router = Router()

const checkNaN = (value: number) => !value || !isNaN(value)

router.get('/', [query('tag_id').custom(checkNaN), query('brand_id').custom(checkNaN)], handler(listCategory))

export default router
