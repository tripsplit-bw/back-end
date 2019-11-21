exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Trips')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('Trips').insert([
				{
					id: 1,
					trip_name: test1,
					destination: 'Test Place 1',
					close_trip: false,
					description: 'Test Trip 1',
					user_id: 1,
					start_date: Date.now(),
					end_date: Date.now()
				},
				{
					id: 2,
					trip_name: test2,
					destination: 'Test Place 2',
					close_trip: false,
					description: 'Test Trip 2',
					user_id: 2,
					start_date: Date.now(),
					end_date: Date.now()
				},
				{
					id: 3,
					trip_name: test3,
					destination: 'Test Place 3',
					close_trip: false,
					description: 'Test Trip 3',
					user_id: 3,
					start_date: Date.now(),
					end_date: Date.now()
				}
			]);
		});
};