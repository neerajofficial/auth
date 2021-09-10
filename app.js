const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const accessControl = require('./config/accessControl');
const authRoutes = require('./routes/authRoutes');

// const MONGODB_URI = 'mongodb://127.0.0.1:27017/auth';
// const MONGODB_URI = `mongodb+srv://neerajsingh:${process.env.MONGO_PASSWORD}@myecom.xn6g1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.xn6g1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const app = express();

app.use(helmet());
app.use(bodyParser.json({extended: false}));
app.use(accessControl);

app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message || 'error';
	res.status(status).json({ message: message });
})

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
})
.then(result => {
	app.listen(process.env.PORT);
	console.log('connected')
})
.catch(error => console.log(error));

// 
