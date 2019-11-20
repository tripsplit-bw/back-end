exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Expenses')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('Expenses').insert([
				{
					expense_id: 1,
					trip_id: 3,
					description: 'Test 1',
					amount: 1
				},
				{
					expense_id: 2,
					trip_id: 3,
					description: 'Test 2',
					amount: 5
				},
				{
					expense_id: 3,
					trip_id: 3,
					description: 'Test 3',
					amount: 20
				}
			]);
		});
};