
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function show(req) {

    const users = await prisma.users.findMany({
        include: {
            groups: true
        }
    })

    return users;
  
}

async function create(req){

    const createdUser = await prisma.users.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        },
    })

    return createdUser;

}

async function read(req) {

    const user = await prisma.users.findFirstOrThrow({
        where: {
            id: parseInt(req.params.userID)
        },
        include: {
            groups: {
                include: {
                    group: true
                }
            }
        }
    })
    console.log(user)
    return user;

}

async function update(req) {

}

async function del(req) {

}

export { show, create, read, update, del }

