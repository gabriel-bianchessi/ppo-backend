import { Router } from 'express'
import pessoaController from '../controllers/pessoa.controller'

const routes = Router()

routes.get('/', pessoaController.index)
routes.get('/:id', pessoaController.get)
routes.put('/:id', pessoaController.update)

export default routes