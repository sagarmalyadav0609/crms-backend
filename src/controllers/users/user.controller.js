const { StatusCodes } = require("http-status-codes");
const { User } = require("../../models");
const { SuccessResponse, ErrorResponse, DeleteFiles } = require("../../utils/common");



const changepassword = async(req,res)=>{
    try {
        await User.update(
            {password: req.hashedpassword},
            {where:{id: req.user.id}}
        );
        SuccessResponse.message = "Password change successfully";
        SuccessResponse.data = {};
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "something went wrong in changePassword";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

module.exports = {
    changepassword
}