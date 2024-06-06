import { StrResponses } from "./StrResponses"

export class RegisError extends Error {
  public statusCode: number
  public message: string

  constructor(statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode
    this.message = message
    Error.captureStackTrace(this, this.constructor)
  }
}

export class UniqueConstraintError extends RegisError {
  constructor(constraint: string) {
    const parseMessage = constraint.split("_").slice(1, -1).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") + " already exists"
    super(409, parseMessage)
  }
}

export class WrongCredentialsError extends RegisError {
  constructor() {
    super(401, StrResponses.WRONG_CREDENTIALS)
  }
}

export class UserNotFoundError extends RegisError {
  constructor() {
    super(404, StrResponses.USER_NOT_FOUND)
  }
}

export class InvalidJWTError extends RegisError {
  constructor() {
    super(401, StrResponses.INVALID_TOKEN)
  }
}

export class UnauthorizedError extends RegisError {
  constructor() {
    super(401, StrResponses.UNAUTHORIZED)
  }
}
