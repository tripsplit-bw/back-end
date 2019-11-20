exports.up = function(knex, Promise) {
	return knex.schema.createTable('Expenses', tbl => {
		tbl.increments('expense_id');
		tbl
			.integer('trip_id')
			.references('trip_id')
			.inTable('trips')
			.notNullable()
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		tbl.string('description', 256).notNullable();
		tbl.integer('amount').notNullable();

		tbl
			.integer('countUsers')
			.notNullable()
			.defaultTo(0);

		tbl.integer('folksPaid');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('Expenses');
};