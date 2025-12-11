const { StatusCodes } = require("http-status-codes")

const fun = async(req,res)=>{
    try {
        return res.status(StatusCodes.OK).json({msg:"hello"});
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:"Error"});

    }
}


module.exports = {
    fun
}