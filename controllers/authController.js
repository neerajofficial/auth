const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./../models/user');
const { validationResult } = require('express-validator');

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);
	const { email, password } = req.body;

	try {
		if (!errors.isEmpty()) {
			let message = errors.array()[0].msg;
			const error =  new Error(message ||'Validation failed.');
			error.statusCode = 422;
			throw error;
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = new User({
			email,
			password: hashedPassword
		});

		const newUser = await user.save();
		res.status(201).json({
			message: 'User created Successfully.', 
			user_id: newUser._id 
		});
	} catch(error) {
       next(error)
	}
}

exports.signin = async (req, res, next) => {
	const { email, password } = req.body;

	try {

		const user = await User.findOne({ email: email })
		if (!user) {
			const error = new Error('Email not found.');
			error.statusCode = 401;
			throw error;
		}
		
		const isEqual = await bcrypt.compare(password, user.password);
		
		if (!isEqual) {
			const error = new Error('Password is incorrect.');
			error.statusCode = 401;
			throw error;
		}
		
		const token = jwt.sign({ 
			email: user.email, 
			user_id: user._id.toString()
			}, process.env.JWT_SECRET, {
				expiresIn: '1h'
		});

		res.status(200).json({ 
			token: token, 
			user_id: user._id.toString(),
			expiresIn: 60 * 60
		});
		
	} catch(error) {
		if (!error.statusCode) {
			error.statusCode = 500;
		}
		next(error)
	}
}