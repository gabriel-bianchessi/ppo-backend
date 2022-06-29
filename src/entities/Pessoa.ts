import { Pessoa, Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient() 

const pessoaModel = {
  async findById(id: string) {
    try {
      let userData = await prisma.pessoa.findUnique({
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
      let userData = await prisma.pessoa.findFirst({
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
      const users = await prisma.pessoa.findMany()
      console.log(users)
      return users
    } catch (err) {
      console.error(err)
    }

  },

  async create(pessoa: Pessoa) {
    try {
      const userToCreate: Pessoa = pessoa
      const result = await prisma.pessoa.create({
        data: {
          ...userToCreate
        }
      })

      return result
    } catch (err) {
      
    }
  }
}

export default pessoaModel