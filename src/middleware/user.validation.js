const userValidationSchema = {
   email: {
      exists: {
         errorMessage: "You must enter a valid email address."
      },
      isEmail: {
         errorMessage: "You must enter a valid email address."
      },
      trim: true,
      toLowerCase: true,
      escape: true
   },
   name: {
      isString: {errorMessage: "You must enter a string of characters."},
      exists: {
         errorMessage: "You must enter your name."
      },
      isLength: {
         errorMessage: "Your name must be greater than three characters.", 
         options: {min: 3}
      },
      trim: true,
      toLowerCase: true,
      escape: true
   }   



}
 


export  { userValidationSchema }
