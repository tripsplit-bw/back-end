const express = require('express');
const Expense = require('./expenses-model');
const authmw = require('../auth/authenticate-middleware');

const router = express.Router();

router.get('/', authmw, async (req, res) => {
	Expense
		.find()
		.then(Expenses => {
			res.json(Expenses)
		})
    .catch(err => {
		res.status(500).json({ err });
    })
});

router.get('/:id', authmw, async (req, res) => {
	const { id } = req.params;
	
	Expense
    .findMembers(id)
    .then(expense => {
		let expenseWithMembers = expense.map(expenseMember =>{
			let expenseMember_id = expenseMember.expenseMember_id;
			let member = expenseMember.expense_username;
			let amountPaid = expenseMember.expense_amount_paid;
			let memberInfo = {
				expenseMember_id: expenseMember_id,
				expenseMemberName: member,
				amountPaid: amountPaid
			}
			return memberInfo
		})
	const memberData ={
        expense_id: expense[0].expense_id,
        trip_id: expense[0].trip_id,
        expense_total: expense[0].expense_total,
        expense_name: expense[0].expense_name,
        expenseMember: expenseWithMembers
	}
		res.json(memberData)
    })
	.catch(err => {
		console.log(err)
		res.status(500).json({ err });
	})
});


router.post('/', authmw, async (req, res) => {
	let expense = req.body;

	Expense
		.addExpense(expense)	
		.then(expense =>{
			res.status(200).json(expense)
		})
		.catch (err => {
			res.status(500).json(err);
		}) 
});


router.delete('/:id', authmw, async (req, res) => {
	const id = req.params;

	Expense
		.deleteExpense(id)
		.then(expense => {
			res.status(200).json(expense)
		})
	
		.catch (err => {
			res.status(500).json(err);
		})
});


router.put('/:id', authmw, async (req, res) => {
	const id = req.params;
	const newExpense = req.body;

	Expense
		.editExpense(id, newExpense)
		.then(editedData => {
			res.status(200).json(editedData)
		})

	.catch (err => {
		res.status(500).json(err);
	})
});

module.exports = router;