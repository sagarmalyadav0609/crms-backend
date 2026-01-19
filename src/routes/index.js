const express = require('express')

const router = express.Router()
const adminRoutes = require('./admin')
const userRoutes = require('./users')

router.use('/admin',adminRoutes)
router.use('/users',userRoutes)
// router.use('/students')


module.exports= router