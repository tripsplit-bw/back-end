const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');
const tripsRouter = require('../trips/trips-router');
const expensesRouter = require('../expenses/expenses-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth/register', authRouter);
server.use('/api/auth/login', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/trips/', tripsRouter);
server.use('/api/trips/:tripid/expenses/', expensesRouter);

server.get('/', (req, res) => {
    res.send('Server Live!');
});

module.exports = server;
