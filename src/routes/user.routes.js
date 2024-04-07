import express from 'express'
import { ParseErrors } from '../utils/errors.js'
const router = express.Router()
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//User CRUD

router.get('/', async (req, res) => {
    const users = await prisma.users.findMany({
        include: {
            groups: true
        }
    })

    res.send(users)
})


router.post('/create', async (req, res) => {

    const createdUser = await prisma.users.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        },
    })

    res.send(createdUser)


})


router.get('/:userID', async(req, res) => {

    try {
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
    }
    catch(e) {
        const niceError = ParseErrors(e)
        res.status(niceError.status).send(niceError)
    }



    res.send(user)

})

export const userRoutes = router;