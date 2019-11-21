exports.up = function(knex, Promise) {
	return knex.schema.createTable('expenseMembers', tbl => {
		tbl.increments();
		tbl
		.string('expense_username')
		.references('username')
		.inTable('Users')

		tbl
		.integer('expense_id')
		.unsigned()
		.references('id')
		.inTable('Expenses')
		.onDelete('CASCADE')
		.onUpdate('CASCADE')

		tbl
		.float('expense_amount_paid')
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('expenseMembers');
};