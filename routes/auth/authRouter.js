const express = require('express');
const authRouter = express.Router();

// Login route
authRouter.post('/login', (req, res) => {
	const { username, password } = req.body;
	res.send({ msg: 'Login Route' });
});

// Register route
authRouter.post('/register', (req, res) => {
	const { username, password } = req.body;

	res.send({ msg: 'Register Route' });
});

module.exports = authRouter;
