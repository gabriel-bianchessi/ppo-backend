import { Request, Response } from "express"
import findUserByEmail from "../useCases/userUseCases/findUserByEmail"
import saveUser from "../useCases/userUseCases/saveUser"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

export default class AuthConttroller {
  async signup(req: Request, res: Response) {
    const { name, email, birthDate, password, group } = req.body

    if (!name || !email || !birthDate || !password || !group) {
      return res.status(400).json({ message: "Missing params" })
    }

    const userAlreadyExists = await findUserByEmail(email)

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    let id = uuid()

    let encryptedPassword = await bcrypt.hash(password, 10)

    const jwtKey = process.env.JWT_KEY || "secret"

    const token = jwt.sign({id, email}, jwtKey, {expiresIn: "1d"})

    const user = await saveUser({
      id,
      name,
      email,
      birthDate,
      password: encryptedPassword,
      group,
      token
    })

    return res.status(200).json(user)
  }
}