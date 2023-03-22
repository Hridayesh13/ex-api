const express = require('express');

const { sequelize, User } = require('./models');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Express + TypeScript Server');
});

app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll();
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

app.get('/users/:uuid', async (req, res) => {
	const uuid = req.params.uuid;

	try {
		const user = await User.findOne({
			where: { uuid },
		});
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(`could not find uuid: ${uuid}`);
	}
});

app.post('/users', async (req, res) => {
	const { name, email, password } = req.body;

	try {
		const user = await User.create({ name, email, password });
		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

app.listen(port, async () => {
	console.log(`Server up on http://localhost:${port}`);
	await sequelize.sync();
	console.log('DATABASE CONNECTED');
});
