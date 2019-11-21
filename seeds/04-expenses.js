exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Expenses')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('Expenses').insert([
				{
					id: 1,
					trip_id: 1,
					description: 'Test 1',
					expense_total: 1
				},
				{
					id: 2,
					trip_id: 2,
					description: 'Test 2',
					expense_total: 5
				},
				{
					id: 3,
					trip_id: 3,
					description: 'Test 3',
					expense_total: 20
				}
			]);
		});
};