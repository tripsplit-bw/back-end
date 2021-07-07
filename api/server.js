const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const tripsRouter = require('../trips/trips-router');
const tripMemberRouter = require('../trips/trip-members-router');
const expensesRouter = require('../expenses/expenses-router');
const expenseMemberRouter = require('../expenses/expense-member-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/profile', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/trips', tripsRouter);
server.use('api/tripMembers', tripMemberRouter);
server.use('/api/expenses', expensesRouter);
server.use('api/expenseMember', expenseMemberRouter);

server.get('/', (req, res) => {
    res.send('Server Live!');
});

module.exports = server;
