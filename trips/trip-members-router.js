const express = require('express');

const TripMembers = require('./trip-members-model');
const authmw = require('../auth/authenticate-middleware');

const router = express.Router();


router.get('/', authmw, (req,res) => {
    TripMembers
        .find()
        .then(response => {
            res.json(response)
        })
        .catch (err => {
            res.status(500).json({ message: 'server error', err });
        })
})

router.get('/:id', authmw, (req,res) =>{
    const { id } = req.params;

    TripMembers
        .findById(id)
        .then(foundMembers => {
            res.json(foundMembers)
        })
        .catch (err => {
            res.status(500).json({ message: 'server error', err });
        })
})

router.post('/', authmw, (req,res) => {
    let tripMember = req.body;

    TripMembers
        .add(tripMember)
        .then(tripMember =>{
            res.status(200).json(tripMember)
        })
        .catch (err => {
            res.status(500).json({ message: 'server error', err });
        })
})


router.delete('/:id', authmw, (req,res) => {
    const { id } = req.params;

    TripMembers
        .remove(id)
        .then(tripMember => {
            res.status(200).json(tripMember)
        })
        .catch (err => {
            res.status(500).json({ message: 'server error', err });
        })
})

router.put('/:id', authmw, (req,res) =>{
    const { id } = req.params;
    const changes = req.body;

    TripMembers
        .edit(id, changes)
        .then(editedData => {
            res.status(200).json(editedData)
        })
        .catch (err => {
            res.status(500).json({ message: 'server error', err });
        })
})

module.exports = router;
