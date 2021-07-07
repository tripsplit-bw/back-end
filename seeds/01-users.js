
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
        {id: 1, username: 'test1', email:'test1@email.com', password: 'test1', first_name:'Name 1', last_name: 'Last 1'},
        {id: 2, username: 'test2', email:'test2@email.com', password: 'test2',first_name:'Name 2', last_name: 'Last 2'},
        {id: 3, username: 'test3', email:'test3@email.com', password: 'test3',
        first_name:'Name 3', last_name: 'Last 3'}
      ]);
    });
};
