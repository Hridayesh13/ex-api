'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			// this.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
			//in post.js
			// this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
		}

		toJSON() {
			return { ...this.get(), id: undefined };
		}
	}
	User.init(
		{
			uuid: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					is: /^[a-z ,.'-]+$/i,
					notEmpty: true,
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: true,
					notEmpty: true,
				},
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					// Minimum eight characters, at least one letter and one number:
					// is: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/i,
					is: /^[A-Za-z\d@$!%*#?&]+$/i,
					notEmpty: true,
				},
				// set(value) {
				// 	// Storing passwords in plaintext in the database is terrible.
				// 	// Hashing the value with an appropriate cryptographic hash function is better.
				// 	this.setDataValue('password', hash(value));
				// },
			},
		},
		{
			sequelize,
			tableName: 'users',
			modelName: 'User',
		}
	);
	return User;
};
