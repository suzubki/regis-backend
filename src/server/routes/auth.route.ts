import { Router } from "express"
import AuthController from "~/server/controllers/auth.controller"
import { validateData } from "~/server/utils/common"
import { createUserSchema, loginUserSchema } from "~/server/validations/auth.validation"

const router = Router()

router.post("/login", validateData(loginUserSchema), AuthController.login)
router.post("/signup", validateData(createUserSchema), AuthController.signUp)

export { router as authRouter }
