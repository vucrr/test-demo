import { Router } from 'express'
import brands from './brands'
import category from './category'
import comment from './comment'
import detail from './detail'
import introduce from './introduce'
import video from './video'

const router = Router()

router.use('/category', category)
router.use('/detail', detail)
router.use('/introduce', introduce)
router.use('/video', video)
router.use('/comment', comment)
router.use('/brands', brands)

export default router
