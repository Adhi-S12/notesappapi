require('dotenv').config();
const jwt = require('jsonwebtoken');

const checkAuthentication = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		req.data = data;
	} catch (error) {
		return res.status(401).send({ error: error.message });
	}
	next();
};

// const generateRefreshToken = (email) => {
// 	const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '12h' });
// };

module.exports = checkAuthentication;
