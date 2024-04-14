import express from 'express'
import { ParseErrors } from '../utils/errors.js'
const router = express.Router()
import { PrismaClient } from '@prisma/client'
import { show, create, read, update, del } from "../controllers/group.controller.js"
import { validate } from '../middleware/validate.js'
import { groupValidationSchema } from '../middleware/group.validation.js'
const prisma = new PrismaClient()

//Group CRUD

router.get('/', async (req, res) => {
    const groups = await show(req)
    console.log("Request made for all groups")
    res.send(groups)
})

router.post('/create', validate(groupValidationSchema), async(req, res) => {
    
    try {

        const createdGroup = await create(req)
        res.send(createdGroup)

    } catch(e) {
        const niceError = ParseErrors(e)
        res.status(niceError.code).send(niceError)
    }

    
   
})

router.get('/:groupID', async(req, res) => {

    try {
        const group = await read(req)
        res.send(group)
    } catch (e) {
            const niceError = ParseErrors(e)
            res.status(niceError.code).send(niceError)
        
    }

  

})

export const groupRoutes = router;