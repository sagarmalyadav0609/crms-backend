const express = require('express')

const authRoutes = require("./auth.routes")
const UserDetailsRoute = require("./user.details.routes")


const router = express.Router()

router.use('/auth',authRoutes)
router.use('/user_details',UserDetailsRoute)

module.exports = router