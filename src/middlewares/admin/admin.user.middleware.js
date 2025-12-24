const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../../utils/common");
const bcrypt = require('bcrypt');
const { ServerConfig } = require("../../config");

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
        ErrorResponse.message = 'Somthing went to wrong in validate create user'
        ErrorResponse.error.explaination = error

        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
       }
}

module.exports = {
    validateCreateuser
}