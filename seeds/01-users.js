
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'test1', email:'test1@email.com', password: 'test1'},
        {id: 2, username: 'test2', email:'test2@email.com', password: 'test1'},
        {id: 3, username: 'test2', email:'test3@email.com', password: 'test3'}
      ]);
    });
};
