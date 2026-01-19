const express = require('express')
const { AdminControllers } = require('../../controllers')
const { Middleware } = require('../../middlewares')

const router = express.Router()

router.post("/",Middleware.AdminUserMiddleware.validateCreateuser, AdminControllers.UserController.onBoard)
router.get("/",AdminControllers.UserController.getUser)
router.put('/access/:id',AdminControllers.UserController.toggleIsBlocked)
router.put('/changepassword/:id',Middleware.AdminUserMiddleware.validateChangePassword,AdminControllers.UserController.changePassword)

module.exports = router