const express = require('express');

const { sequelize, User } = require('./models');
const { Op } = require('sequelize');

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
	res.send('Express + TypeScript Server');
});

// CREATE
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

// READ ALL USERS
app.get('/users', async (req, res) => {
	try {
		const users = await User.findAll({ limit: 10 });
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// FIND A USER
app.get('/users/find', async (req, res) => {
	const { value } = req.body;
	try {
		if (value) {
			const user = await User.findAll({
				where: {
					[Op.or]: [
						{ uuid: value },
						{ name: { [Op.like]: `%${value}%` } },
						{ email: { [Op.like]: `%${value}%` } },
					],
				},
			});
			console.log(user);
			if (!user[0]) {
				return res.json(`user not found`);
			} else {
				return res.json(user);
			}
		} else {
			return res.json('cannot search with empty field.');
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json(`invalid params ---- ${err}`);
	}
});

// UPDATE Password WITH UUID
app.put('/users/update', async (req, res) => {
	const { uuid, name, email, password } = req.body;
	console.log(name);
	try {
		const user = await User.findOne({
			where: { uuid },
		});

		if (name) user.name = name;
		if (email) user.email = email;
		if (password) user.password = password;
		await user.save();

		return res.json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
});

// DELETE USER WITH UUID
app.delete('/users/delete', async (req, res) => {
	const { uuid } = req.body;

	try {
		const user = await User.destroy({
			where: { uuid },
		});
		if (!user) {
			return res.json(`could not find user / already deleted`);
		} else {
			return res.json(`user deleted with uuid: ${uuid}`);
		}
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
