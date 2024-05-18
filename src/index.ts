import express from "express"
import morgan from "morgan"
import { env } from "~/env"
import { errorHandler, responseHandler } from "~/server/utils/errors"
import routes from "./server/routes"

const app = express()
const PORT = env.PORT

app.use(express.json())

app.use(morgan("dev"))

app.use("/", routes)

app.use(responseHandler)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
