'use strict';

const util = require('util');

module.exports = (knex, logger) => {
  knex.client.on('start', (queryBuilder) => {
    let startAt;

    queryBuilder.on('query', (query) => {
      startAt = process.hrtime();
    });

    queryBuilder.on('query-error', (err, query) => {
      logger.error(err.message);
    });

    queryBuilder.on('query-response', (response, query, builder) => {
      let diff = process.hrtime(startAt);
      let ms = diff[0] * 1e3 + diff[1] * 1e-6;
      logger.info(util.format(
        '%sms %s [%s]',
        ms.toFixed(3),
        query.sql,
        query.bindings.join(', ')
      ));
    });

    // queryBuilder.on('end', () => {
    //   // do something
    // });
  });
};
