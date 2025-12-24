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
}
module.exports = {
    onBoard,
    getUser
}

