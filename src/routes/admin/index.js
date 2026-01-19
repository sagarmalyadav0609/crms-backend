const express = require('express')
const userRoutes = require("./users.routes")
const authRoutes = require("./auth.routes")
const userDetailsRoute = require("./user_detailes.routes")
const AdminPlanRoutes = require ('./plan.routes')


const router = express.Router()
router.use('/users', userRoutes)
router.use('/auth',authRoutes)
router.use('/userdetails',userDetailsRoute)
router.use('/plan',AdminPlanRoutes)
module.exports = router