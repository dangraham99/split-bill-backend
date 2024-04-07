import express from 'express'
export const router = express.Router()
import { ParseErrors } from '../utils/errors.js'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//Transactions CRUD

router.get('/', async (req, res) => {
    const transactions = await prisma.transactions.findMany({
        include: {
            group: true,
            owner: true
        }
    })

    res.send(transactions)
})


router.post('/create', async (req, res) => {

   
    //dummy data
    const createdTransaction = await prisma.transactions.create({
        data: {
            title: faker.commerce.productName(),
            content: faker.commerce.productDescription(),
            valueInCents: Math.floor(Math.random() * 1010),
            published: Math.floor(Math.random() * 2) ? true : false,
            owner: {
                connect: {
                    id:  Math.floor(Math.random() * 23),
                }
            },
            group: {
                connect: {
                    id: 4
                }
            }
        },
        
    })

    res.send(createdTransaction)


})


router.get('/:transactionID', async(req, res) => {

    try {
        const transaction = await prisma.transactions.findFirstOrThrow({
            where: {
                id: parseInt(req.params.transactionID)
            },
            include: {
                group: true,
                owner: true
                
            },
          
        })

        res.send(transaction)
    }
    catch(e) {
        const niceError = ParseErrors(e)
        res.status(niceError.status).send(niceError)
    }



   

})

export const transactionRoutes = router;