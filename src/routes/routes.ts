import { Router } from "express"
import AuthConttroller from "../controllers/auth.controller"
import authRoutes from "./auth.routes"
import userRoutes from "./user.routes"

const authController = new AuthConttroller()

const routes = Router()

routes.get("/", (req, res) => res.json({ message: req.body }))
routes.use("/auth", authRoutes)
routes.use("/user", userRoutes)

export default routes
