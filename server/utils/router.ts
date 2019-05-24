import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator/check'
import { RouterRequest } from '../interfaces/router'

interface RequestParser<Req> {
  (req: Request): Req
}

interface Handler<Req, Res> {
  (req: Req): Promise<Res>
}

const defaultParser = (req: Request): RouterRequest => {
  const newReq = {
    headers: req.headers,
    cookies: req.cookies,
    query: req.query,
    params: req.params,
  }
  if (['GET', 'DELETE'].includes(req.method)) return newReq
  return { ...newReq, body: req.body }
}

export function handler<Req, Res>(handler: Handler<Req, Res>, parser?: RequestParser<Req>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error: any = errors.array().find((_, index) => index === 0)
      return res.json({
        status: 400,
        errorMsg: `请求参数错误-${error.location}: ${error.param}`,
        errors: errors.array(),
      })
    } else {
      const parsedReq: any = parser ? parser(req) : defaultParser(req)
      handler(parsedReq).then(
        (resolve: any) => res.json(resolve.status && resolve.errorMsg ? resolve : { status: 200, data: resolve }),
        reject => next(reject),
      )
    }
  }
}

export function handlerHTML<Req, Res>(requestParser: RequestParser<Req>, handler: Handler<Req, Res>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsedReq = requestParser(req)
    handler(parsedReq).then((resolve: any) => res.send(resolve), reject => next(reject))
  }
}
