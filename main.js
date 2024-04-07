import express from 'express'
import bodyParser from 'body-parser'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const app = express()
app.use(express.json())
const port = 3000
const prisma = new PrismaClient()

app.get('/user/create', async (req, res) => {

    const createdUser = await prisma.users.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        },
    })

    res.send(createdUser)


})

app.post('/group/create', async(req, res) => {
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


app.get('/', async (req, res) => {
    const users = await prisma.users.findMany({
        include: {
            groups: true
        }
    })

    res.send(users)
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})