import express from 'express'
import { userRoutes } from './src/routes/user.routes.js'
import { groupRoutes } from './src/routes/group.routes.js'
import {transactionRoutes} from './src/routes/transactions.routes.js'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const app = express()

const port = 3000
const prisma = new PrismaClient()

app.use(express.json())
app.use('/users', userRoutes)
app.use('/groups', groupRoutes)
app.use('/transactions', transactionRoutes)




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})