module.exports = function (sequelize, DataTypes) {
	var Message = sequelize.define("Message", {
		// Giving the Author model a name of type STRING
		body: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [1]
			}
		},
		reported: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		brinyDeeps: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		seenCount: {
			type: DataTypes.INTEGER,
			allowNull: false

		}


	});
	Message.associate = function (models) {
		// Associating Author with Posts
		// When an Author is deleted, also delete any associated Posts
		Message.belongsTo(models.User, { as: 'Sender' });
		Message.belongsTo(models.User, { as: 'Keeper' });
		//Message.belongsToMany(models.SeenMessages, { as: 'Message' });
	};

	return Message;
};