import { Pessoa, Pessoa_role } from "@prisma/client"
import { Request, Response } from "express"
import pessoaModel from "../entities/Pessoa"
import {v4 as uuid} from "uuid"
import bcrypt, { hash } from "bcrypt"

const pessoaController = {
  async index(req: Request, res: Response){
    const userData = await pessoaModel.findAll()
    res.json(userData)
  },

  async get(req: Request, res: Response) {
    return "Busca de um único usuário"
  },

  async post(req: Request, res: Response) {
    const reqData = req.body

    let encryptedPassword = await bcrypt.hash(String(reqData.senha), 10)
  

    const userToCreate: Pessoa = {
      id: reqData.id ? reqData.id : uuid(),
      nome: reqData.nome,
      email: reqData.email,
      senha: encryptedPassword,
      role: reqData.role ? reqData.role : "USER",
      createdAt: Date.now();
      updatedAt: null,
    }

    // const result = await pessoaModel.create(userToCreate)

    return res.json({userToCreate})
  }
}

export default pessoaController