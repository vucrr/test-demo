import { NextFunction, Request, Response } from 'express'
import { authHandler, checkLogin } from '../utils/tools'

export function auth(req: Request, res: Response, next: NextFunction) {
  if (checkLogin(req)) {
    next()
  } else {
    res.json(authHandler())
  }
}
