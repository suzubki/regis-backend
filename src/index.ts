import express, { type Request, type Response } from "express"
import morgan from "morgan"
import { env } from "~/env"
import routes from "./routes"

const app = express()
const PORT = env.PORT

app.use(morgan("dev"))

app.use("/", routes)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!")
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
