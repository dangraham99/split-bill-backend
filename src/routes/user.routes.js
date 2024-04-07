import express from 'express'
import { show, create, read, update, del } from '../controllers/user.controller.js'
const router = express.Router()
import { ParseErrors } from '../utils/errors.js'


//User CRUD

router.get('/', async (req, res) => {

    const users = await show(req)
    res.send(users)
})


router.post('/create', async (req, res) => {

    const createdUser = await create(req)
    res.send(createdUser)


})


router.get('/:userID', async(req, res) => {

    try {
        
        const user = await read(req)
        res.send(user)
    }
    catch(e) {
        const niceError = ParseErrors(e)
        res.status(niceError.status).send(niceError)
    }



   

})

export const userRoutes = router;