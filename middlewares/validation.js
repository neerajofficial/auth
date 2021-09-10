const { check, body } = require('express-validator');
const User = require('./../models/user');

const checkCustomEmail = (value, { req }) => {
	return User.findOne({ email: value })
		.then(userDoc => {
			if (userDoc) {
				return Promise.reject('E-Mail address already exists!');
			}
		})
}

const emailcheck = () => {
	return check('email')
		.isEmail()
		.withMessage('Invalid Email Address')
		.normalizeEmail()
}

const passwordCheck = (filedName) => {
	return body(filedName, 'Password should be of minimum 6 characters length.')
		.isLength({min: 6})
		.isAlphanumeric()
		.trim()
}

const validator = [
	emailcheck().custom(checkCustomEmail),
	passwordCheck('password')
]

module.exports = validator;