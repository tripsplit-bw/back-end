const db = require('../data/dbConfig');

module.exports = {
	findByExId,
	addExToTrip,
	findByTripId,
	deleteExpense,
	updateExpense,
	boolPaidStatus
};

function findByExId(expense_id) {
	return db('expenses')
		.where({ expense_id })
		.first();
}

async function addExToTrip(expense, authorName) {
	let { trip_id } = expense;
	let [ExID] = await db('expenses')
	.insert(expense, 'expense_id');
	

	expenseMemberObj = {
		username: authorName,
		trip_id: trip_id,
		expense_id: ExID
	};
	let exMemberCreator = await db('expenseMembers')
	.insert(expenseMemberObj,'id');

	let ExRes = await findByExId(ExID);

	return ExRes;
}

async function findByTripId(trip_id) {
	let tripex = await db('expenses')
	.where('expenses.trip_id', trip_id);

	return tripex;
}

async function deleteExpense(expense_id) {
	let deleted = await db('expenses')
		.where({ expense_id })
		.first()
		.del();

	return deleted;
}

async function updateExpense(expense_id, toBeNewExpense) {
	let update = await db('expenses')
		.where({ expense_id })
		.update(toBeNewExpense);

	let newExpense = await findByExId(expense_id);

	return newExpense;
}

async function boolPaidStatus(expense_id, trip_id, username) {
	const oldStatus = await db("expenseMembers")
		.select("paid")
		.where({
			expense_id: expense_id,
			username: username.toLowerCase(),
			trip_id: trip_id
		})
		.first();

	const newStatus = await db("expenseMembers")
		.where({
			expense_id: expense_id,
			username: username.toLowerCase(),
			trip_id: trip_id
		})
		.update("paid", !oldStatus.paid);

	return getExpenseMembers(expense_id);
}