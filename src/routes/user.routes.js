import express from 'express'
import { show, create, read, update, del } from '../controllers/user.controller.js'
const router = express.Router()
import { ParseErrors } from '../utils/errors.js'
import { validate } from '../middleware/validate.js'
import { userValidationSchema } from '../middleware/user.validation.js'


//User CRUD

router.get('/', async (req, res) => {

    const users = await show(req)
    res.send(users)
})


router.post('/create', validate(userValidationSchema), async (req, res) => {

   

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
        res.status(niceError.code).send(niceError)
    }



   

})

export const userRoutes = router;