exports.up = function(knex, Promise) {
	return knex.schema.createTable('Expenses', tbl => {
		tbl.increments();

		tbl
		.string('expense_name', 256).notNullable();

		tbl
			.integer('trip_id')
			.unsigned()
			.references('id')
			.inTable('Trips')
			.onDelete('CASCADE')
			.onUpdate('CASCADE')
			.notNullable()

		tbl
		.float('expense_total')
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('Expenses');
};