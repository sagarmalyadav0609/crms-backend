const express = require('express')

const router = express.Router()
const adminRoutes = require('./admin')

router.use('/admin',adminRoutes)
// router.use('/users')
// router.use('/students')


module.exports= router