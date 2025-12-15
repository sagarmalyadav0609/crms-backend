const express = require('express');
const { AdminControllers } = require('../../controllers');

const router = express.Router();

router.post('/signin',AdminControllers.AuthController.signIn)

module.exports = router