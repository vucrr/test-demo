import { Router } from 'express'
import Address from '../../controllers/trade/address'
import { auth } from '../../middlewares/auth'
// import { query } from 'express-validator/check'
import { handler } from '../../utils/router'

const router = Router()

router.get('/city', auth, handler(Address.getCityList))
router.get('/form', auth, handler(Address.getAddressForm))
router.get('/setform', auth, handler(Address.setAddressForm))

export default router
