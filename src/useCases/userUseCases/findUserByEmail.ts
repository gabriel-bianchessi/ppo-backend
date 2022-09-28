import { PrismaClient, Prisma, User } from '@prisma/client'

const prisma = new PrismaClient()

export default async function findUserByEmail(email: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  return user
}