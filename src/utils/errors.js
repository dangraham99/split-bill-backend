export const ParseErrors = (error) => {
    console.log(error)
    var errorObject = {}
    
    if (error.name == "NotFoundError") {
        errorObject = {
            "code": 404,
            "message": "The requested resource was not found."
        }
    } 
    else if (error.name == "ValidationError") {
        errorObject = {
            "code": 400,
            "message": "ValidationError",
            "description": error.errors
        }
        
    }
    else if (error.name == "SyntaxError"){
        errorObject = {
            "code": 400,
            "message": error.message
        }
    }
    else {
        errorObject = {
            "code": 500,
            "message": "Internal server error."
        }
    }
    
    return errorObject
}
