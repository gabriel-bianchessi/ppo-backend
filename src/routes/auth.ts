import { Router } from "express"
import pessoaController from "../controllers/pessoa.controller"
const router = Router()

router.post('/signup', pessoaController.create)

export { router }