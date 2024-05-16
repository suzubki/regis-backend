import { type Request, type Response, Router } from "express"

const router = Router()

router.post("/signup", (_req: Request, _res: Response) => {
})

export { router as authRouter }
