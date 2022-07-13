import { Pessoa, Prisma, PrismaClient } from "@prisma/client"
const { pessoa } = new PrismaClient() 

const pessoaModel = {
  async findById(id: string) {
    try {
      let userData = await pessoa.findUnique({
        where: {
          id: id
        },
      })

      return userData
    } catch(err) {
      console.error(err)
    }
  },

  async findByEmail(email:string) {
    try {
      let userData = await pessoa.findFirst({
        where: {
          email: email
        },
      })

      return userData
    } catch(err) {
      console.error(err)
    }
  },
  
  async findAll() {
    try {
      const users = await pessoa.findMany({
        select: {
          id: true,
          email: true,
          nome: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        }
      })
      return users
    } catch (err) {
      console.error(err)
    }

  },

  async create(pessoaParam: Pessoa) {
    try {
      const userToCreate: Pessoa = pessoaParam
      
      const result = await pessoa.create({
        data: {
          ...userToCreate
        }
      })

      return result
    } catch (err) {
      
    }
  },

  async update(pessoaParam: Pessoa) {
    try {
      const pessoaToUpdate: Pessoa = pessoaParam

      const result = await pessoa.update({ 
        data: {
          ...pessoaToUpdate
        },
        where: {
          id: pessoaParam.id
        }
      })
    } catch (err) {
      
    }
  }
}

export default pessoaModel