import type { ErrorRequestHandler, NextFunction, Request, Response } from "express"
import { UniqueConstraintError } from "./RegisError"

const createErrorResponse = (message: string, status: number) => {
  return {
    message: message,
    status_code: status,
  }
}

export const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  // Handle unique constraint error
  if (err.code == "23505") {
    const error = new UniqueConstraintError(err.constraint)
    return res.status(error.statusCode).json(createErrorResponse(error.message, error.statusCode))
  }

  return res.status(err.status || 500).json(createErrorResponse(err.message, err.status || 500))
}

type CommonExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void
export const responseHandler: CommonExpressMiddleware = (req, res, next) => {
  if (res.locals.data) {
    const statusCode = res.locals.status || 200

    return res.status(statusCode).json({
      message: "Success",
      data: res.locals.data,
    })
  }
  next()
}
