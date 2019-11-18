const db = require('../data/dbConfig');

module.exports = {
	addTrip,
	editTrip,
	deleteTrip,
	getTripByUser,
	getTripById,
	booleanTrip
};

function getTripByUser(create_trip) {
	return db('trips')
	.where({ create_trip});
}

async function getTripById(trip_id) {
	let trip = await db('trips')
		.where({ trip_id })
		.first();

	let expenses = await db('expenses')
		.join('trips', 'trips.trip_id', 'expenses.trip_id')
		.where('expenses.trip_id', trip_id)
		.select(
			'expenses.expense_id',
			'expenses.trip_id',
			'expenses.description',
			'expenses.amount'
		);

	let members = await db('expenseMembers')
		.join('trips', 'trips.trip_id', 'expenseMembers.trip_id')
		.where({
			'expenseMembers.trip_id': trip_id,
			'expenseMembers.expense_id': null
		})
		.select('expenseMembers.username', 'expenseMembers.paid');
	

	if (trip && expenses && members) {
		return {
			...trip,
			expenses,
			members
		};
	} else if (trip && expenses) {
		return {
			...trip,
			expenses
		};
	} else if (trip && members) {
		return {
			...trip,
			members
		};
	} else if (trip) {
		return trip;
	} else {
		return false;
	}
}

async function addTrip(trip, authorName) {
	const [id] = await db('trips')
	.insert(trip, 'trip_id');
	
	const newExpMember = {
		username: authorName,
		trip_id: id
	};

	
	const expenseMember = await db('expenseMembers')
	.insert(newExpMember, 'id');

	return getTripById(id);
}

async function booleanTrip(trip_id) {
	const oldStatus = await db('trips')
		.select('completed')
		.where({ trip_id })
		.first();

	const newStatus = await db('trips')
		.where({ trip_id })
		.update('completed', !oldStatus.completed);

	return getTripById(trip_id);
}

async function deleteTrip(trip_id) {
	let deleted = await db('trips')
		.where({ trip_id })
		.first()
		.del();

	return deleted;
}

async function editTrip(trip_id, toBeNewTrip) {
	let update = await db('trips')
		.where({ trip_id })
		.update(toBeNewTrip);

	let newTrip = await getTripById(trip_id);

	return newTrip;
}