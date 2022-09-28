import { PrismaClient, Prisma, User } from '@prisma/client'

const prisma = new PrismaClient()

type UserProps = {
  id: string,
  name: string,
  email: string,
  birthDate: Date,
  password: string
  group: string,
  token: string
}

export default async function saveUser(props: UserProps): Promise<User> {

  const user = await prisma.user.create({
    data: {
      id: props.id,
      name: props.name,
      email: props.email,
      birthDate: props.birthDate,
      password: props.password,
      token: props.token,
      groups: {
        connectOrCreate: {
          where: {
            uncapitalizedTitle: props.group.toLowerCase()
          },
          create: {
            title: props.group,
            uncapitalizedTitle: props.group.toLowerCase()
          } 
        }
      }
    }
  })

  return user
} 