require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const authRouter = require('./routes/auth/authRouter');

app.use('/auth', authRouter);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		app.listen(3000, () => {
			console.log(`Connected to DB and server running on PORT ${PORT}`);
		});
	})
	.catch((err) => {
		console.log('Error Establishing connection. Please try again later', err.message);
	});
