const transactionValidationSchema = {
    title: {
       isString: {errorMessage: "You must enter a string of characters."},
       exists: {
          errorMessage: "You must enter a title."
       },
       isLength: {
          errorMessage: "Your title must be greater than three characters.", 
          options: {min: 3}
       },
       trim: true,
       toLowerCase: true,
       escape: true
    },
    content: {
        isString: {errorMessage: "You must enter a string of characters."},
        isLength: {
           errorMessage: "Your content must be greater than three characters.", 
           options: {min: 3}
        },
        optional: true,
        trim: true,
        toLowerCase: true,
        escape: true
     },  
     valueInCents: {
        exists: {errorMessage: "Transaction must have a value."},
        isInt: {
            min: 0,
            allow_leading_zeros: false,
            errorMessage: "You must enter a valid number."
        },
        escape: true
     },
     published: {
        optional: true,
        isBoolean: {errorMessage: "You must enter a boolean value."},
        escape: true
     },
 
 }
  

 
 export  { transactionValidationSchema }