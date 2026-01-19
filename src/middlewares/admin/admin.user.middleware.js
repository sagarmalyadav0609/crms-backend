const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, Utility } = require("../../utils/common");
const bcrypt = require('bcrypt');
const { ServerConfig } = require("../../config");
// const {User} = require("../../models")
const validateCreateuser = async(req,res,next)=>{
       try {
        const {name,email,password} = req.body;
        
       if(!name || !email || !password){
        ErrorResponse.message = 'All fields are required'
        ErrorResponse.error.explaination = 'Name / Email / password is missing'

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
       }
       
       const hashedPassword = await bcrypt.hash(password,Number(ServerConfig.SALT_ROUNDS))
       req.body.password = hashedPassword

       next()
       } catch (error) {
        console.log(error)
        ErrorResponse.message = 'Somthing went to wrong in validate create user'
        ErrorResponse.error.explaination = error

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
       }
}



const validateChangePassword = async(req,res,next)=>{
       try {
        const userId = req.params.id;
        
        const {oldPassword,newPassword,confirmPassword} = req.body;
        const errors = []
        if(!oldPassword) errors.push('Old password is missing')
        if(!newPassword) errors.push('New password is missing')
        if(!confirmPassword) errors.push('confirm password is missing')
        
        if(newPassword !== confirmPassword) errors.push('new password and confirm password is not same')
        if(oldPassword === newPassword) errors.push('old password and new password should not be same')

        if(errors.length > 0){
            ErrorResponse.message = "validation failds";
            ErrorResponse.message.explaination = errors;

            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        const user = User.findByPk(userId)
         if(!user){
        ErrorResponse.message = 'user not found';
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse)
      }
        const isOldPasswordIsCorrect = await bcrypt.compare(
            oldPassword,
            User.password
            
        )
        if(!isOldPasswordIsCorrect){
            ErrorResponse.message = "Old password is not correct";
          return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)

        }
        const hashedNewPassword = await Utility.encryptedPassword(newPassword)
        req.user;
        req.hashedPassword = hashedNewPassword
        next();
    } catch (error) {
        ErrorResponse.message = "Somthing went to wrong in change password in middleware";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
       }
}
module.exports = {
    validateCreateuser,
    validateChangePassword
    
}