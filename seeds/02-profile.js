
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('profile').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('profile').insert([
        {id: 1, username: 'test1', first_name:'Name 1', last_name: 'Last 1'},
        {id: 2, username: 'test2', first_name:'Name 2', last_name: 'Last 2'},
        {id: 3, username: 'test2', first_name:'Name 3', last_name: 'Last 3'}
      ]);
    });
};
