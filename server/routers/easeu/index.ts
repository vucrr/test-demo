import { Router } from 'express'
import creditCard from './credit-card'
import trade from './trade'

const router = Router()

router.use('/trade', trade)
router.use('/credit-card', creditCard)

export default router
