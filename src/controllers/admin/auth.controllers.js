const { StatusCodes } = require('http-status-codes');
const {Admin} = require('../../models');
const { ErrorResponse, Utility, SuccessResponse } = require('../../utils/common');

const signIn = async(req,res)=>{
    try {
       const {email,password} = req.body;
      let newEmail= email.toLowerCase()

        const getAdmin = await Admin.findOne({
            where:{
                email:newEmail
            }
        })
        if(getAdmin===null){
            ErrorResponse.error.message='Admin not found with the corresponding email'
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        const comparePassword = await Utility.comparePassword(password,getAdmin.password)
        if(!comparePassword){
            ErrorResponse.error.message='Invalid Password'
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        const jwt = Utility.generateJwtToken({
            id: getAdmin.id,
            email:getAdmin.email,
            type:getAdmin.type
        })
          console.log(jwt);
          const [updateData] = await Admin.update(
        {
            jwt_token:jwt
        },
        {
            where:{
                id:getAdmin.id
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

module.exports = {
    signIn
}