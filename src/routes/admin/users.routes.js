const express = require('express')
const { AdminControllers } = require('../../controllers')

const router = express.Router()

router.get("/", AdminControllers.UserController.fun)

module.exports = router