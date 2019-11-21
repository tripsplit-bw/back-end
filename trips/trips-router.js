const express = require('express');
const Trips = require('../trips/trips-model');
const authmd = require('../auth/authenticate-middleware');

const router = express.Router();

router.get('/', authmd, async (req, res) => {
	Trips
    .find()
    .then(trips => {
		res.json(trips)
    })
	.catch (err => {
		res.status(500).json({ message: 'server error', err });
	})
});



router.get('/:id', authmd, async (req, res) => {
	const id = req.params;

	Trips
    .findMembers(id)
    .then(foundTrip => {
		let tripWithMembers = foundTrip.map(trip =>{
        let tripMember_id = trip.tripMembers_id
        let member = trip.trip_username
        let tripMember = {
			tripMember_id: tripMember_id,
			member_username: member
        }
        return tripMember
	})
	const tripData = {
        trip_id: foundTrip[0].trip_id,
        trip_name: foundTrip[0].trip_name,
        trip_owner_id: foundTrip[0].tripOwner_id,
        trip_close_trip: foundTrip[0].close_trip,
        trip_start_date: foundTrip[0].start_date,
        trip_end_date: foundTrip[0].end_date,
        trip_members: tripWithMembers
    }
		return tripData
    })
    .then(tripData =>{
		Trips
			.findExpenses(tripData.trip_id)
			.then(tripExpenses => {
				const thisTripExpenses = tripExpenses.map(expense => {
					let id = expense.id
					let trip_expense_name = expense.expense_name
					let expense_total = expense.expense_total
					let expenseInfo = {
						expense_id: id,
						expense_name: trip_expense_name,
						expense_total: expense_total
					}
						return expenseInfo
					})
			const tripWithExpenseData = {
				trip_id: tripData.trip_id,
				trip_name: tripData.trip_name,
				trip_owner_id: tripData.trip_owner_id,
				trip_close_trip: tripData.trip_close_trip,
				trip_start_date: tripData.trip_start_date,
				trip_end_date: tripData.trip_end_date,
				trip_members: tripData.trip_members,
				expenseInfo: thisTripExpenses
			}
			res.json(tripWithExpenseData)
			})
	})
	.catch (err => {
		res.status(500).json(err);
	})
});

router.post('/', authmd, async (req, res) => {
	let trip = req.body;

	Trips
		.addTrip(trip)
		.then(trip =>{
			res.status(200).json(trip)
		})
		.catch (err => {
			res.status(500).json({ message: 'database error', err });
		})	
});


router.delete('/:id', authmd, async (req, res) => {
	const id = req.params;

	Trips
    .deleteTrip(id)
    .then(trip => {
		res.status(200).json(trip)
    })
	.catch (err => {
		res.status(500).json(err);
	})
});


router.put('/:id', authmd, async (req, res) => {
	const id = req.params.id;
	let tripUpdates = req.body;

	Trips
	.editTrip(id, tripUpdates)
	.then(editedData => {
		res.status(200).json(editedData)
	})
	.catch (err => {
		res.status(500).json({ err });
	})
});

module.exports = router;