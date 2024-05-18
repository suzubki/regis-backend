import { type Request } from "express"

interface ParamsDictionary {
  [key: string]: string
}

export interface AuthorizedRequest<_ = unknown, B = object, Q = object> extends Request<ParamsDictionary, never, B, Q> {
  auth: {
    email: string
    id: string
  }
  params: ParamsDictionary
  body: B
  query: Q
}
