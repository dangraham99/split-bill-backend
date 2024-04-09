import express from 'express'
export const router = express.Router()
import { ParseErrors } from '../utils/errors.js'
import {show, create, read, update, del} from '../controllers/transactions.controller.js'


//Transactions CRUD

router.get('/', async (req, res) => {
    const transactions = await show(req)
    res.send(transactions)
})


router.post('/create', async (req, res) => {

   const createdTransaction = await create(req)
    res.send(createdTransaction)


})


router.get('/:transactionID', async(req, res) => {

    try {
        
        const transaction = await read(req)
        res.send(transaction)
        
    }
    catch(e) {
        const niceError = ParseErrors(e)
        res.status(niceError.status).send(niceError)
    }


   
   

})

export const transactionRoutes = router;