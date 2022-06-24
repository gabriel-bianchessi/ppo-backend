import { Router } from 'express'

const routes = Router()

routes.get('/', (req, res) => {
  console.log("Rota get de pessoa")
})

export default routes