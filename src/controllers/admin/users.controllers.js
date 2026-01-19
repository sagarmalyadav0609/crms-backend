const { StatusCodes } = require("http-status-codes")
const { User,User_details } = require("../../models")
const { SuccessResponse, ErrorResponse } = require("../../utils/common")
// const user_details = require("../../models/user_details")
const onBoard = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const response = await User.create({
            name, email, password, status: false
        })
        SuccessResponse.message = "successfully created user"
        SuccessResponse.data = {}
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        console.log(error);
        console.log(error.name)
        if (error.name == 'SequelizeUniqueConstraintError' || error.name == 'SequelizeValidationError') {
            const err = error.errors.map((val) => {
                //   console.log(val.message,'***********************************')
                return val.message
            })

            ErrorResponse.message = "somthing went wrong while regestering user"
            ErrorResponse.error.explanation = err
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)

        }

        if (error.name == 'SequelizeDatabaseError') {
            console.log(Object.keys(error));
            console.log(error.original.sqlMessage);
            ErrorResponse.message = "somthing went wrong while regestering user"
            ErrorResponse.error.explanation = [error.original.sqlMessage]
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)

        }

        ErrorResponse.message = "Internal server error"
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

const getUser = async (req, res) => {
    try {
        const userDetails = await User.findAll(
            {
                include:{
                   model:User_details,
                   as:"User_details",
                },
                attributes: {
                    exclude: ['password'] // List columns to skip
                },
                order: [
                    ['id', 'DESC']
                ]

            }
        );
            SuccessResponse.message = 'user featched successfully',
            SuccessResponse.data = userDetails

        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
        ErrorResponse.message = "Internal server error";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
};

const toggleIsBlocked = async(req,res)=>{
      try {
        const userId = req.params.id;

       const user = await User.findByPk(userId)

    // console.log(user,'**************************')

      if(!user){
        ErrorResponse.message = 'user not found';
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse)


      }
      const updateIsBlocked = !user.isBlocked;

      await User.update(
        {
            isBlocked:updateIsBlocked,
        },
        {
            where:{
                id: userId,

            }
        },
      );
      SuccessResponse.message = `User ${updateIsBlocked ? 'Blocked':'UnBlocked'} Successfully`
      SuccessResponse.data = {
        id:userId,
        isBlocked:updateIsBlocked
      }
      return res.status(StatusCodes.OK).json(SuccessResponse)
      } catch (error) {
        //   console.log(error,'************88')
        ErrorResponse.message = "Somthing went to wrong in toggle case";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);

    }


         
}

const changePassword = async(req,res)=>{
    try {
       const userId = req.params.id
       const hashedPassword = req.hashedPassword
       
       await User.update(
        {
            password:hashedPassword
        },{
            where:{
                id:userId
            }
        }
       )
       SuccessResponse.message = "password change sussfully";
       SuccessResponse.data = {};
       return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Somthing went to wrong in change password"
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}


module.exports = {
    onBoard,
    getUser,
    toggleIsBlocked,
    changePassword
}

