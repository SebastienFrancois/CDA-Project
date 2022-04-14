import { Response, Request, NextFunction } from 'express'

export interface CustomError {
  status: number
  message: ErrorEvent
  stack: string
}

export default function errorHandler(
  error: CustomError,
  req: Request,
  res: Response
) {
  console.log({
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
  })
  return res.status(error.status || 500).send({
    status: error.status || 500,
    message: error.message,
    stack: error.stack,
  })
}
