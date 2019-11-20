const db = require('../data/dbConfig');

module.exports = {
    register,
    remove,
    find,
    findBy,
    findById,
};

function find() {
    return db('users')
    .select('id', 'username');
}

function findBy(filter) {
    return db('users')
    .where(filter);
}

async function register(user) {
    // const profile = {
	// 	username: user.username
	// };
    const [id] = await db('users')
    .insert(user);

    // const userProfile = await db('profiles')
    // .insert(profile, 'username');

	return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

async function remove(id) {
    const [deleted] = await findById('id')

    await db('users')
    .where({ id })
    .del();

    return deleted;
}
