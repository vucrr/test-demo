import { Router } from 'express'
import { query } from 'express-validator/check'
import { receiveVideoDetail } from '../../controllers/product/video-detail'
import { handler } from '../../utils/router'

const router = Router()

router.get(
  '/',
  [
    query('video_id')
      .exists()
      .isInt(),
  ],
  handler(receiveVideoDetail),
)

export default router
