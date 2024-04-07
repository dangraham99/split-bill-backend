import express from 'express'
import bodyParser from 'body-parser'
import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'
const app = express()
app.use(express.json())
const port = 3000
const prisma = new PrismaClient()


const ParseErrors = (error) => {

    var errorObject = {}
    
    if (error.name = "NotFoundError") {
        errorObject = {
            "status": 404,
            "message": "The requested resource was not found."
        }
    }
    
    return errorObject
}

/*
Parses PrismaClient errors and returns a plain English response
WIP, will add further error types once known.

*/

//User CRUD

app.get('/users', async (req, res) => {
    const users = await prisma.users.findMany({
        include: {
            groups: true
        }
    })

    res.send(users)
})


app.post('/user/create', async (req, res) => {

    const createdUser = await prisma.users.create({
        data: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
        },
    })

    res.send(createdUser)


})


app.get('/user/:userID', async(req, res) => {

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


//Group CRUD

app.get('/groups', async (req, res) => {
    const users = await prisma.groups.findMany({
        include: {
            users: true
        }
    })

    res.send(groups)
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

app.get('/group/:groupID', async(req, res) => {

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
                }
            }
        })

        res.send(group)
    }

    catch(e){
        const niceError = ParseErrors(e)
        res.status(niceError.status).send(niceError)
    }
 

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})