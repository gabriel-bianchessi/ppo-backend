import { Router } from 'express'
import AuthConttroller from '../controllers/auth.controller'

const authController = new AuthConttroller()

const routes = Router()

routes.post('/signup', authController.signup )
routes.post('/login', authController.login)
routes.post('/logout', authController.logout)
routes.get('/logged', authController.logged)

export default routes