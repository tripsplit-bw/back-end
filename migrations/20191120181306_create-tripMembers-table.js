exports.up = function(knex, Promise) {
    return knex.schema.createTable('tripMembers', tbl => {
        tbl.increments();

        tbl
        .string('trip_username')
        .references('username')
        .inTable('Users')

        tbl
        .integer('trip_id')
        .unsigned()
        .references('id')
        .inTable('Trips')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNullable()
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tripMembers');
};
