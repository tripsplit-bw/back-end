const express = require('express');

const ExpenseMember = require('./expense-member-model')
const authmw = require('../auth/authenticate-middleware');

const router = express.Router();

router.get('/', authmw, (req,res) => {
    ExpenseMember
        .find()
        .then(expenseMember => {
            res.json(expenseMember)
        })
        .catch (err => {
			res.status(500).json(err);
		})
})

router.get('/:id', authmw, (req,res) =>{
    const { id } = req.params;

    ExpenseMember
        .findById(id)
        .then(expenseMember => {
            res.json(expenseMember)
        })
        .catch (err => {
			res.status(500).json(err);
		})
})

router.post('/', authmw, (req,res) => {
    let expenseMember = req.body;

    ExpenseMember
        .add(expenseMember)
        .then(expenseMember =>{
            res.status(200).json(expenseMember)
        })
        .catch (err => {
			res.status(500).json(err);
		})
})

router.delete('/:id', authmw, (req,res) => {
    const { id } = req.params;

    ExpenseMember
        .remove(id)
        .then(expenseMember => {
            res.status(200).json(expenseMember)
        })
        .catch (err => {
			res.status(500).json(err);
		})
})

router.put('/:id', authmw, (req,res) =>{
    const { id } = req.params;

    const changes = req.body;

    ExpenseMember
        .edit(id, changes)
        .then(editedData => {
            res.status(200).json(editedData)
        })
        .catch (err => {
			res.status(500).json(err);
		})
})

module.exports = router;
