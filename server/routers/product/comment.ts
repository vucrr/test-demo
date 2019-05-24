import { Request, Router } from 'express'
import { query } from 'express-validator/check'
import { listComments } from '../../controllers/product/comment'
import { RouterRequest } from '../../interfaces/router'
import { handler } from '../../utils/router'

const router = Router()

function parseListComments(req: Request): RouterRequest {
  return {
    headers: req.headers,
    query: Object.assign({ action: 'getModelComment', pageNum: 10 }, req.query),
  }
}

const checkNaN = (value: number) => !value || !isNaN(value)

router.get(
  '/',
  [
    query('modelId')
      .exists()
      .isInt(),
    query('pageId')
      .exists()
      .isInt(),
    query('tag')
      .exists()
      .isInt(),
    query('pageNum').custom(checkNaN),
  ],
  handler(listComments, parseListComments),
)

export default router
