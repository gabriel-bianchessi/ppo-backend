import { Router } from "express";
import routesPessoa from "./pessoa.routes" 

const routes = Router()

routes.use("/pessoa", routesPessoa)

export { routes }