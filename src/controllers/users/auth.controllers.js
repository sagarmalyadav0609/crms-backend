const { StatusCodes } = require('http-status-codes');
const {User} = require('../../models');
const { ErrorResponse, Utility, SuccessResponse } = require('../../utils/common');

const signIn = async(req,res)=>{
    try {
       const {email,password} = req.body;
      let newEmail= email.toLowerCase()
      console.log('#############',req.body);
        const getUser = await User.findOne({
            where:{
                email:newEmail
            }
        })
        if(getUser===null){
            ErrorResponse.error.message='User not found with the corresponding email'
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        const comparePassword = await Utility.comparePassword(password,getUser.password)
        if(!comparePassword){
            ErrorResponse.error.message='Invalid Password'
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        const jwt = Utility.generateJwtToken({
            id: getUser.id,
            email:getUser.email,
            type:getUser.type
        })
          console.log(jwt);
          const [updateData] = await User.update(
        {
            jwt_token:jwt
        },
        {
            where:{
                id:getUser.id
            }
        }
          )
        if(!updateData){
            ErrorResponse.error.message='Jwt is not updated'
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        SuccessResponse.data=jwt
         return res.status(StatusCodes.OK).json(SuccessResponse)
          
        
    } catch (error) {
        ErrorResponse.error.message='Internal Server Error'
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}



const signOut = async(req,res)=>{
      try {
          const token = req.headers.authorization;
        if(!token){
            ErrorResponse.error.message = "token is missing";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        const getUser = await User.findOne({
            where:{
                jwt_token:token,
            }
        });
        if(!getUser){
            ErrorResponse.error.message = "User doesnot exists / invalid or expired token";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }

        await User.update(
            {
                jwt_token:null,
            },
            {
                where:{
                    id:getUser.id
                }
            }
        );
        SuccessResponse.message = "logout successfully";
        SuccessResponse.data = {}
        return res.status(StatusCodes.OK).json(SuccessResponse)
      } catch (error) {
        ErrorResponse.error.message = "internal server error";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
      }
};
module.exports = {
    signIn,
    signOut
}