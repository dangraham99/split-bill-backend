import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function show(req) {
    const groups = await prisma.groups.findMany({
        include: {
            users: true,
            transactions: true
        }
    })

    return groups;

}

async function create(req){

    console.log(req.body)

    const createdGroup = await prisma.groups.create({
        data:{
            title: req.body.title,
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
                transactions: true
            }
        })

        return group
}

async function update(req) {

}

async function del(req) {

}

export { show, create, read, update, del }