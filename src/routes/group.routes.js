import express from 'express'
import { ParseErrors } from '../utils/errors.js'
const router = express.Router()
import { PrismaClient } from '@prisma/client'
import { show, create, read, update, del } from "../controllers/group.controller.js"
const prisma = new PrismaClient()

//Group CRUD

router.get('/', async (req, res) => {
    const groups = await show(req)
    res.send(groups)
})

router.post('/create', async(req, res) => {
    createdGroup = await create(req)
    res.send(createdGroup)
})

router.get('/:groupID', async(req, res) => {

    try {
        const group = await read(req)
        res.send(group)
    } catch (e) {
            const niceError = ParseErrors(e)
            res.status(niceError.status).send(niceError)
        
    }

  

})

export const groupRoutes = router;