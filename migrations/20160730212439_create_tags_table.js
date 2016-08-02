'use strict';

exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('tags', (t) => {
    t.increments();
    t.string('name').unique().notNullable();
  })
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('tags')
]);
