exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('Trips')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('Trips').insert([
				{
					trip_id: 1,
					destination: 'Test Place 1',
					close_trip: false,
					trip_name: 'Test Trip 1',
					trip_start: Date.now(),
					trip_end: Date.now()
				},
				{
					trip_id: 2,
					destination: 'Test Place 2',
					close_trip: false,
					trip_name: 'Test Trip 2',
					trip_start: Date.now(),
					trip_end: Date.now()
				},
				{
					trip_id: 3,
					destination: 'Test Place 3',
					close_trip: false,
					trip_name: 'Test Trip 3',
					trip_start: Date.now(),
					trip_end: Date.now()
				}
			]);
		});
};