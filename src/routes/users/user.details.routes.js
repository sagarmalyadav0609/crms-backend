
const express = require('express')
const router = express.Router()
const upload = require('../../utils/common/multer')

const { UserController } = require('../../controllers')
router.patch('/update/:id',
    upload.fields([{ name: "school_logo", maxCount: 1 },{ name: "assets", maxCount: 10 },]),
     UserController.UserDetailsController.patchUserDetails)
router.put('/update/assets/:id',
         upload.fields([{ name: "school_logo", maxCount: 1 },{ name: "assets", maxCount: 10 },]),

    UserController.UserDetailsController.updateUserAssets)

module.exports=router
