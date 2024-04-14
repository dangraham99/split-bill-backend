import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/af_ZA'
const prisma = new PrismaClient()

async function show(req) {

    const transactions = await prisma.transactions.findMany({
        include: {
            group: true,
            owner: true
        }
    })

    return transactions
}

async function create(req){

    const max = await prisma.users.count()

    //dummy data
    const createdTransaction = await prisma.transactions.create({
        data: {
            title: faker.commerce.productName(),
            content: faker.commerce.productDescription(),
            valueInCents: Math.floor(Math.random() * 5070),
            published: Math.floor(Math.random() * 2) ? true : false,
            owner: {
                connect: {
                    id:  req.body.ownerId,
                }
            },
            group: {
                connect: {
                    id: req.body.groupId
                }
            }
        },
        
    })

    return createdTransaction

}

async function read(req) {

    const transaction = await prisma.transactions.findFirstOrThrow({
        where: {
            id: parseInt(req.params.transactionID)
        },
        include: {
            group: true,
            owner: true
            
        },
      
    })
    console.log(transaction)
    return transaction

}

async function update(req) {

}

async function del(req) {

}

export { show, create, read, update, del }