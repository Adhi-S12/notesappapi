const express = require('express');
const authRouter = express.Router();
const { handleLogin, handleRegister } = require('../../controller/AuthController');

// Login route
authRouter.post('/login', handleLogin);

// Register route
authRouter.post('/register', handleRegister);

module.exports = authRouter;
