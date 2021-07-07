const router = require('express').Router();
const Users = require('./users-model.js');
const restricted = require('../auth/authenticate-middleware.js');
const TripMember = require('../trips/trip-members-model');

router.get('/', restricted, (req, res) => {
    Users
    .findBy()
    .then(users => {
            res.json(users);
    })
    .catch(error => res.send(error));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Users
        .findByIdWTrip(id)
        .then(foundUser => {

        let userOwnedTrips = foundUser.map(user => {
            let id = user.id
            let trip_name = user.trip_name
            let isTripClosed = user.close_trip
            let start_date = user.start_date
            let end_date = user.end_date
            let tripItem = {
                id: id,
                trip_name: trip_name,
                isTripClosed: isTripClosed,
                start_date: start_date,
                end_date: end_date
            }
            return tripItem
        })

        const userData = {
            username: foundUser[0].username,
            first_name: foundUser[0].first_name,
            last_name: foundUser[0].last_name,
            OwnedTrips: userOwnedTrips
        }
        return userData

        })
        .then(userData => {
            TripMember
                .findMember(userData.username)
                .then(notOwnerMember => {
                    console.log(notOwnerMember)
                    const tripUserIsMember = notOwnerMember.map(trip =>{
                        let trip_id = trip.trip_id
                        let trip_name = trip.trip_name
                        let myMember = {
                            trip_id: trip_id,
                            trip_name: trip_name
                        }
                        return myMember
                    })

                    const userWithMembershipData = {
                        username: userData.username,
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        ownedTrips: userData.OwnedTrips,
                        memberTrips: tripUserIsMember
                    }
                        res.json(userWithMembershipData)
                    })
        })
        .catch(error => res.send(error));
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users
    .editUser(id, changes)
    .then(editedData => {
        res.json(editedData)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to update user' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users
    .where({ id })
    .del()
    .then(count => {
        if (count) {
            res.json({ removed: count });
        } else {
            res.status(404).json({ message: 'Could not find user with given id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to delete user' });
    });
});

module.exports = router;