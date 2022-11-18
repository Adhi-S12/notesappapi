require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (req, res) => {
	res.send({ message: 'Hello World' });
});

app.listen(3000, () => {
	console.log(`Server running on PORT ${PORT}`);
});
