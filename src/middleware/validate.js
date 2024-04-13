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
                    const niceError = ParseErrors(e)
                    res.status(niceError.code).send(niceError)
                    
                }
                
   
        }
    ]
}
export  {validate}