import { Request, Response } from "express"
import findUserByEmail from "../useCases/userUseCases/findUserByEmail"
import saveUser from "../useCases/userUseCases/saveUser"
import bcrypt from 'bcrypt'
import {v4 as uuid} from 'uuid'

const session: { [key: string]: string } = {}

export default class AuthConttroller {
  async signup(req: Request, res: Response) {
    console.log("signup")
    const { name, email, birthDate, password, group } = req.body

    if (!name || !email || !birthDate || !password || !group) {
      return res.status(400).json({ message: "Missing params" })
    }

    const userAlreadyExists = await findUserByEmail(email)

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    let id = uuid()
    let formatedBirthDate = new Date(birthDate)
    let encryptedPassword = await bcrypt.hash(password, 10)

    const user = await saveUser({
      id,
      name,
      email,
      birthDate: formatedBirthDate,
      password: encryptedPassword,
      group,
    })

    return res.status(200).json(user)
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body
    
    if (!email || !password) {
      return res.status(400).json({ message: "Missing params" })
    }
    
    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(400).json({ message: "User or password doesn't match" })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(400).json({ message: "User or password doesn't match" })
    }

    const sesId = uuid()
    session[sesId] = user.email

    res.cookie('sesid', sesId, { maxAge: 900000, httpOnly: true }).status(200).json({ message: "Logged in" })
  }

  async logout(req: Request, res: Response) {
    const userSession = req.cookies.sesid

    if (!userSession) {
      return res.status(400).json({ message: "Missing params" })
    }

    console.log( "Antes " , session)
    delete session[userSession]
    console.log(" depois " , session)
    res.clearCookie('sesid').status(200).json({ message: "Logged out" })
  }

  async logged(req: Request, res: Response) {
    const sesid = req.cookies.sesid
    
    const userEmail = session[sesid]

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const userExists = await findUserByEmail(userEmail)

    if (!userExists) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    return res.status(200).json({ message: "Logged" })
  }
}