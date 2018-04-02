exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('list', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('packed');

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('list')
  ]);
};