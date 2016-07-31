'use strict';

const util = require('util');
const chalk = require('chalk');

module.exports = (knex) => {
  knex.client.on('start', (queryBuilder) => {
    let startAt;

    queryBuilder.on('query', (query) => {
      startAt = process.hrtime();
    });

    queryBuilder.on('query-error', (err, query) => {
      console.log(chalk.red(err.message));
    });

    queryBuilder.on('query-response', (response, query, builder) => {
      let diff = process.hrtime(startAt);
      let ms = diff[0] * 1e3 + diff[1] * 1e-6;
      let msg = util.format(
        '%sms %s [%s]',
        ms.toFixed(3),
        query.sql,
        query.bindings.join(', ')
      );
      console.log(chalk.green(msg));
    });

    // queryBuilder.on('end', () => {
    //   // do something
    // });
  });
};
