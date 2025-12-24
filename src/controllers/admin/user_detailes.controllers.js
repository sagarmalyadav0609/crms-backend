const { StatusCodes } = require('http-status-codes')
const { User_details } = require('../../models')
const { SuccessResponse, ErrorResponse } = require('../../utils/common')
const createOnbordDetails = async (req, res) => {
    try {
        const {
            user_id,
            name,
            email,
            contact,
            school_name,
            address,
            school_logo,
            school_url,
            assets, } = req.body

        const details = await User_details.create({
            user_id,
            name,
            email,
            contact,
            school_name,
            address,
            school_logo,
            school_url,
            assets,
            status: true
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
            // console.log(Object.keys(error));
            // console.log(error.original.sqlMessage);
            ErrorResponse.message = "somthing went wrong while regestering user"
            ErrorResponse.error.explanation = [error.original.sqlMessage]
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)

        }

        ErrorResponse.message = "Internal server error"
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

module.exports = {
    createOnbordDetails
}