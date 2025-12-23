const { StatusCodes } = require("http-status-codes")
const {User} = require ("../../models")
const {SuccessResponse, ErrorResponse} = require("../../utils/common")
 const onBoard = async(req,res)=>{
try {
    const {name,email,password}=req.body
        const response = await User.create({
            name,email,password
        })
        SuccessResponse.message="successfully created user" 
        SuccessResponse.data={}
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
} catch (error) {
    console.log(error);
    console.log(error.name)
    if(error.name == 'SequelizeUniqueConstraintError'){
       const err = error.errors.map((val)=>{
        //   console.log(val.message,'***********************************')
        return val.message
       })
       ErrorResponse.message = "somthing went wrong while regestering user"
       ErrorResponse.error.explanation = err
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)

    }
    
    ErrorResponse.message="Internal server error"
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
}
 }

 const getUser = async(req,res)=>{
     try {
        const userDetails = await User.findAll();
        SuccessResponse.message = 'user featched successfully',
        SuccessResponse.data = userDetails

        return res.status(StatusCodes.OK).json(SuccessResponse)
     } catch (error) {
         ErrorResponse.message = "Internal server error";
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
     }
 }
module.exports={
    onBoard,
    getUser
}

