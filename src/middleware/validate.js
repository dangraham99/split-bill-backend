import {checkSchema, validationResult} from 'express-validator'
import { ParseErrors } from '../utils/errors.js'

const validate = (schema) => {
    return [
        
        checkSchema(schema),
        (req, res, next) => {
                try {
                    const errors = validationResult(req)
                    if (!errors.isEmpty()) {
                        throw { name: "ValidationError", errors: errors.mapped() }
                    }
                    next()
                }
                catch (e) {
                    console.log("Error")
                    console.log(e)

                    /*
                    Calling the util in error.js and sending a response straight from the middleware

                    TODO:   review and abstract the sending of the response data, to follow the practice 
                            used in the routes and controller files
                    */
                    
                    const niceError = ParseErrors(e)
                    res.status(niceError.code).send(niceError)
                    
                }
                
   
        }
    ]
}
export  {validate}