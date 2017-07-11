
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable('state', function(table) {
        table.increments('id').primary();
        table.string('state').unique();
        table.specificType('people', 'text[]')
        table.integer('deaths')
        table.timestamps(true, true);
      })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('state')
  ]);
};
