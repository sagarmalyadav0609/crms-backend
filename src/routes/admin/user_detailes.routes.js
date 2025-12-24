const express = require('express')
const { AdminControllers } = require('../../controllers')
const upload = require('../../utils/common/multer')


const router = express.Router()

router.post("/",upload.fields([
    {name:"school_logo",maxCount:1},
    {name:"assets",maxCount:5}
]),AdminControllers.UserDetailsController.createOnbordDetails)

module.exports = router