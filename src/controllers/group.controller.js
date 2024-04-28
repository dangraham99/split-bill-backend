import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function show(req) {
    const groups = await prisma.groups.findMany({
        include: {
            users: { include: {user: true}},
            transactions: true
        }
    })

    return groups;

}

async function create(req){

    console.log(req.body)

    const createdGroup = await prisma.groups.create({
        data:{
            title: faker.lorem.sentence({ min: 1, max: 3 }),
            users: {
                create: [{userId: req.body.admin, admin: true}]
            }
        },
    })


    return createdGroup;

}

async function read(req) {
 
        const group = await prisma.groups.findFirstOrThrow({
            where: {
                id: parseInt(req.params.groupID)
            },
            include: {
                users: {
                    include: {
                        user: true
                    }
                },
                transactions: {
                    orderBy: { createdAt: "desc"},
                    include: {
                        //TODO: limit the fields that are shown with this include
                        owner: true
                    }
                }
            }
        })

        return group
}

async function update(req) {

}

async function del(req) {

}

export { show, create, read, update, del }