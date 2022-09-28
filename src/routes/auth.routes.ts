import { Router } from 'express'
import AuthConttroller from '../controllers/auth.controller'

const authController = new AuthConttroller()

const route = Router()

route.get('/signup', authController.signup)

export default route