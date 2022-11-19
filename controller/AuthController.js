require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const AuthModel = require('../model/AuthModel');

const handleLogin = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ error: 'Need both email and password to Login' });
	}

	const { email, password } = req.body;

	const user = await AuthModel.findOne({ email: email }).exec();
	if (!user) {
		return res.status(400).send({ error: 'User does not exists. Please register.' });
	}

	const isMatch = bcrypt.compareSync(password, user.password);

	if (isMatch) {
		const accessToken = generateAccessToken(user.email, user._id);
		return res.status(202).send({ msg: 'Logged in successfully', accessToken, email: user.email });
	} else {
		return res.status(401).send({ error: 'Invalid Credentials. Please try again.' });
	}
};

const handleRegister = async (req, res) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).send({ error: 'Need both email and password to register' });
	}
	const { email, password } = req.body;

	const user = await AuthModel.findOne({ email: email }).exec();
	if (user) {
		return res.status(409).send({ error: 'User already exists in the database. Try logging in.' });
	}

	const hashedPwd = await bcrypt.hash(password, saltRounds);
	const data = new AuthModel({
		email: email,
		password: hashedPwd,
	});

	data
		.save()
		.then((doc) => {
			console.log(doc);
			const accessToken = generateAccessToken(doc.email, doc._id);
			res.status(200).send({ doc, accessToken });
		})
		.catch((err) => {
			console.error(err);
		});
};

const generateAccessToken = (email, id) => {
	const accessToken = jwt.sign({ email, id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '2d',
	});
	console.log(accessToken);
	return accessToken;
};

module.exports = {
	handleLogin,
	handleRegister,
};
