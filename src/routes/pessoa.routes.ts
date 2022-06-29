import { Router } from 'express'
import pessoaController from '../controllers/pessoa.controller'

const routes = Router()

routes.get('/', pessoaController.index)

export default routes