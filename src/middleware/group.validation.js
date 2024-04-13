const groupValidationSchema = {
    title: {
       exists: {
          errorMessage: "You must enter a title for the group."
       },
       isString: {
          errorMessage: "You must enter a string of characters."
       },
       isLength: {
        errorMessage: "Your name must be greater than three characters.", 
        options: {min: 3}
        },
       trim: true,
       escape: true
    },
    balanceInCents: {
        optional: true,
        isInt: {
            errorMessage: "Balance must be an integer."
        }
    },
    bio: {
        optional: true,
        isString: {
            errorMessage: "You must enter a string of characters"
        },
        trim: true,
        escape: true

    },
    admin: {
        exists: {
            errorMessage: "Group requires an admin to be specified."
        },
        isInt: {
            errorMessage: "Must be an integer."
        }

    }
    
 
 }
  
 
 
 export  { groupValidationSchema }