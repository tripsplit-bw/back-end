const db = require('../data/dbConfig');

module.exports = {
    register,
    deleteUser,
    editUser,
    find,
    findBy,
    findById,
    findByIdWTrip
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
    const [id] = await db('users')
    .insert(user, 'id');

	return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function findByIdWTrip(id){
    return db('users')
        .leftJoin('trips', 'trips.user_id', 'users.id')
        .where('users.id', id)
}

async function editUser(id, changes){
    await db('users')
    .where('id', id)
    .update(changes)

    return findById(id);
}


async function deleteUser(id) {
    const [deleted] = await findById('id')

    await db('users')
    .where({ id })
    .del();

    return deleted;
}
