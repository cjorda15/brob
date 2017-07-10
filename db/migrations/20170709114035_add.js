exports.up = function(knex, Promise) {
  return Promise.all([
  knex.schema.createTable('stats', function(table) {
    table.string('id').unique();
    table.string('name');
    table.string('age');
    table.string('sex');
    table.string('race');
    table.string('month');
    table.string('day');
    table.string('year');
    table.string('address');
    table.string('city');
    table.string('state')
    .references('state.state')
    table.string('cause');
    table.string('dept');
    table.string('armed');
    table.string('__v')
    table.timestamps(true,true);
    })
  ])
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('stats'),
  ]);
};
