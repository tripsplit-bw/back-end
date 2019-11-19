exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('trips')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('trips').insert([
				{
					trip_id: 1,
					destination: 'Test Place 1',
					description: 'Test Trip 1',
					trip_creator: 1,
					trip_start: Date.now()
				},
				{
					trip_id: 2,
					destination: 'Test Place 2',
					description: 'Test Trip 2',
					trip_creator: 3,
					trip_start: Date.now()
				},
				{
					trip_id: 3,
					destination: 'Test Place 3',
					description: 'Test Trip 3',
					trip_creator: 3,
					trip_start: Date.now()
				}
			]);
		});
};