exports.up = function(knex, Promise) {
	return knex.schema.createTable('Trips', tbl => {
		tbl.increments();
		tbl.boolean('close_trip')
		tbl.string('destination', 256);
		tbl.string('description', 256);

		tbl
		.string('trip_name', 255)
		.notNullable();
		tbl
		.integer('user_id')
		.unsigned()
		.references('id')
		.inTable('Users')
		.onDelete('CASCADE')
		.onUpdate('CASCADE')

		tbl
		.date('start_date')

		tbl
		.date('end_date')
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('Trips');
};