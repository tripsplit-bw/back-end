exports.up = function(knex, Promise) {
	return knex.schema.createTable('Users', users => {
		users.increments();
		users
			.string('username', 128)
			.notNullable()
			.unique();
		users
			.string('email', 128)
			.unique();
		users.string('password', 16).notNullable();
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('Users');
};