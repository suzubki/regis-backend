import { Router } from "express"
import AuthController from "~/server/controllers/auth.controller"
import { createUserSchema, validateData } from "~/server/validations/auth.validation"

const router = Router()

router.post("/login", AuthController.login)
router.post("/signup", validateData(createUserSchema), AuthController.signUp)

export { router as authRouter }
