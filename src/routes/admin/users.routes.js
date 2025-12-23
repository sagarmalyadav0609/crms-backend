const express = require('express')
const { AdminControllers } = require('../../controllers')
const { Middleware } = require('../../middlewares')

const router = express.Router()

router.post("/",Middleware.AdminUserMiddleware.validateCreateuser, AdminControllers.UserController.onBoard)
router.get("/",AdminControllers.UserController.getUser)

module.exports = router