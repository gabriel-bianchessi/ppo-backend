import { Pessoa } from "@prisma/client"
import { Request, Response } from "express"
import pessoaModel from "../entities/Pessoa"
import {v4 as uuid} from "uuid"
import bcrypt from "bcrypt"

const pessoaController = {
  async index(req: Request, res: Response){
    const userData = await pessoaModel.findAll()
    res.json(userData)
  },

  async get(req: Request, res: Response) {
    const id = req.params.id

    if(!id) {
      return res.json({
        "Erro": "O id é obrigatório"
      })
    }

    const userData = await pessoaModel.findById(id)
    res.json(userData)
  },

  async create(req: Request, res: Response) {
    const reqData = req.body

    const userAlreadyExists = await pessoaModel.findByEmail(req.body.email)
    if(userAlreadyExists !== null) {
      console.log(userAlreadyExists)
      return res.json({
        "errorMessage": "Este e-mail já está em uso por outro usuário"
      })
    }

    let encryptedPassword = await bcrypt.hash(String(reqData.senha), 10)
  

    const userToCreate: Pessoa = {
      id: reqData.id ? reqData.id : uuid(),
      nome: reqData.nome,
      email: reqData.email,
      senha: encryptedPassword,
      role: reqData.role ? reqData.role : "USER",
      createdAt: new Date(),
      updatedAt: null,
    }

    const result = await pessoaModel.create(userToCreate)

    return res.json({result})
  },

  async update(req: Request, res: Response) {
    const id = req.params.id
    const userAlreadyExists = await pessoaModel.findById(id)
    if(!userAlreadyExists) {
      return res.json({ 
        "errorMessage": "O usuário que você está tentando alterar não existe"
      })
    }

    return res.json({
      "errorMessage":"Controller do update hehe"
    })
  }
}

export default pessoaController