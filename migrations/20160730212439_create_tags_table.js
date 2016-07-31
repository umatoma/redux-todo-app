'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('tags', (t) => {
      t.increments();
      t.string('name').unique().notNullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tags')
  ]);
};
