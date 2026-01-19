const express = require('express');
const { UserController } = require('../../controllers');

const router = express.Router();

router.post('/singin',UserController.AuthController.signIn)
router.post('/signout',UserController.AuthController.signOut)

module.exports = router