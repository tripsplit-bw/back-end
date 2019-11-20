const express = require('express');
const Trips = require('../trips/trips-model');
const TripExpenses = require('../expenses/expenses-model');
const TripMembers = require('../expenses/memberexp-model');
const authmd = require('../auth/authenticate-middleware');

const router = express.Router();

router.get('/', authmd, async (req, res) => {
	const creatorId = req.headers.userId;

	try {
		const trips = await Trips.getTripByCreator(creatorId);

		res.status(200).json({ trips });
	} catch (err) {
		res.status(500).json({ message: 'server error', err });
	}
});

router.get('/:id', authmd, async (req, res) => {
	const id = req.params.id;

	try {
		const trip = await Trips.getTripById(id);
		if (trip) {
			const tripMembers = await TripMembers.getTripMembers(id);

			res.status(200).json(trip);
		} else {
			res.status(404).json({ message: 'trip not found' });
		}
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/:id/members', authmd, async (req, res) => {
	const id = req.params.id;

	try {
		let tripMembers = await TripMembers.getTripMembers(id);
		res.status(200).json(tripMembers);
	} catch (error) {
		res.status(500).json({ error });
	}
});

router.post('/:id/members', authmd, async (req, res) => {
	const id = req.params.id;
	let { username } = req.body;

	if (username) {
		try {
			let tripMembers = await TripMembers.addMemberToTrip(id, username);
			res.status(201).json(tripMembers);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(400).json({
			message: 'Needs username'
		});
	}
});


router.delete(':/id/members', authmd, async (req, res) => {
	const trip_id = req.params.id;
	let { username } = req.body;

	if (username) {
		try {
			let tripMembers = await TripMembers.removeMemberFromTrip(
				trip_id,
				username
			);
			res.status(201).json(tripMembers);
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(400).json({
			message:
				'missing username'
		});
	}
});


router.get('/:id/updateStatus', authmd, async (req, res) => {
	const id = req.params.id;

	try {
		const updatedStatus = await Trips.boolTripStatus(id);

		res.status(200).json(updatedStatus);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/addTrip', authmd, async (req, res) => {
	const authorID = req.headers.userID;
	const authorName = req.headers.userName;
	let { description, trip_start, trip_end } = req.body;

	if (description) {
		trip = {
			trip_creator: authorID,
			description: description,
			trip_start: trip_start,
			trip_end: trip_end
		};

		try {
			const tripAdded = await Trips.addTrip(trip, authorName);
			res.status(201).json(tripAdded);
		} catch (err) {
			res.status(500).json({ message: 'database error', err });
		}
	} else {
		res.status(500).json({ message: 'description required' });
	}
});


router.delete('/:id', authmd, async (req, res) => {
	const id = req.params.id;

	try {
		let toDelete = await Trips.deleteTrip(id);
		if (toDelete === 1) {
			res
				.status(200)
				.json({ message: `Your trip has been deleted successfully!` });
		} else {
			res.status(404).json({
				message: `Trip could not be deleted.`
			});
		}
	} catch (error) {
		res.status(500).json(error);
	}
});


router.put('/:id', authmd, async (req, res) => {
	const id = req.params.id;
	let tripUpdates = req.body;

	try {
		let newTrip = await Trips.updateTrip(id, tripUpdates);
		res.status(202).json(newTrip);
	} catch (error) {
		res.status(500).json({ err });
	}
});

module.exports = router;