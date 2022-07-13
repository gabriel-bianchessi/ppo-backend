import { Router } from "express";
import routesPessoa from "./pessoa.routes" 

const routes = Router()

routes.get("/", (req, res) => {
  res.send("Hello World")
})

routes.use("/pessoa", routesPessoa)

export { routes }