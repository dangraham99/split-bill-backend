export const ParseErrors = (error) => {

    var errorObject = {}
    
    if (error.name = "NotFoundError") {
        errorObject = {
            "status": 404,
            "message": "The requested resource was not found."
        }
    }
    
    return errorObject
}
