exports.up = function(knex, Promise) {
	return knex.schema.createTable('Memberexp', tbl => {
		tbl.increments();
		tbl
			.integer('expense_id')
			.references('expense_id')
			.inTable('expenses')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl
			.string('username')
			.references('username')
			.inTable('profile')
			.notNullable()
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl
			.integer('trip_id')
			.references('trip_id')
			.inTable('trips')
			.notNullable()
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.boolean('paid').defaultTo(false);
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('Memberexp');
};