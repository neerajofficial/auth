const express = require('express');

const User = require('./../models/user');
const authController = require('./../controllers/authController');
const validator = require('./../middlewares/validation')

const router = express.Router();

router.post('/signup', validator, authController.signup);

router.post('/signin', authController.signin);

module.exports = router;