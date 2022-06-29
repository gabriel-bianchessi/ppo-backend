import { prisma, PrismaClient } from "@prisma/client"
const prismaClient = new PrismaClient() 

const pessoaModel = {
  findById(id: string) {
    try {
      let userData = prismaClient.pessoa.findUnique({
        where: {
          id: id
        },
      })

      return userData
    } catch(err) {
      console.error(err)
    }
  },

  findByEmail(email:string) {
    try {
      let userData = prismaClient.pessoa.findFirst({
        where: {
          email: email
        },
      })

      return userData
    } catch(err) {
      console.error(err)
    }
  }
}

export default pessoaModel