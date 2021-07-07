const request = require('supertest');
const db = require('../data/dbConfig');

const server = require('./server');

describe('server', () => {
    describe('GET /', () => {
        it('needs to return 200 OK', async () => {
            const res = await request(server)
            .get('/');
            return expect(res.status).toBe(200);
        });

    it('needs to return JSON formatted response', async () => {
        const res = await request(server)
        .get('/');
        return expect(res.type).toMatch(/json/i);
    });

});

describe('POST /register', () => {
    describe('adds user', () => {
        beforeEach(async () => {
            await db('users').truncate();
        });

        it('needs to return 200 OK', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'test21', password: 'password21' });
            expect(res.status).toBe(200);
        });

        it('validates', async () => {
            const res = await request(server)
                .post('/api/auth/register')
                .send({ username: 'test21', password: 'password21' });
            expect(res.body.error).toBe(undefined);
        });
    });
});

describe('POST /login', () => {
    describe('log in user', () => {
        it('needs to return 200 OK', async () => {
            const res = await request(server)
                .post('/api/auth/login')
                .send({ username: 'test21', password: 'password21' });
            expect(res.status).toBe(200);
        });

        it('returns json', async () => {
            const res = await request(server)
            .post('/api/auth/login')
            .send({ username: 'test21', password: 'password21' });
            expect(res.type).toMatch(/json/i);
        });
    });
});
});