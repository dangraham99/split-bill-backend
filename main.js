import express from 'express'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const app = express()
const port = 3000
const prisma = new PrismaClient()

app.get('/user/create', async (req, res) => {

    const createdUser = await prisma.user.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        },
    })

    res.send(createdUser)


})


app.get('/', async (req, res) => {
    const users = await prisma.user.findMany()

    res.send(users)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})