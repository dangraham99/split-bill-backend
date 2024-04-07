import express from 'express'
import { ParseErrors } from '../utils/errors.js'
const router = express.Router()
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//Group CRUD

router.get('/', async (req, res) => {
    const groups = await prisma.groups.findMany({
        include: {
            users: true,
            transactions: true
        }
    })

    res.send(groups)
})

router.post('/create', async(req, res) => {
    console.log(req.body)

    const createdGroup = await prisma.groups.create({
        data:{
            title: req.body.title,
            users: {
                create: [{userId: req.body.admin, admin: true}]
            }
        },
    })
    res.send(createdGroup)
})

router.get('/:groupID', async(req, res) => {

    try {
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

        res.send(group)
    }

    catch(e){
        const niceError = ParseErrors(e)
        res.status(niceError.status).send(niceError)
    }
 

})

export const groupRoutes = router;