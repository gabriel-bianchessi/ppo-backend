import { Router } from 'express'
import pessoaController from '../controllers/pessoa.controller'

const routes = Router()

routes.get('/', pessoaController.index)
routes.post('/', pessoaController.post)

export default routes