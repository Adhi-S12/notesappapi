require('dotenv').config();
const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send({ message: 'Hello World' });
});

app.listen(3000, () => {
	console.log('Server running on PORT 3000');
});