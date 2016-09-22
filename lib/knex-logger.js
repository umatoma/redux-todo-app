'use strict';

module.exports = (knex, logger) => {
  knex.client.on('start', (queryBuilder) => {
    let startAt;

    queryBuilder.on('query', () => {
      startAt = process.hrtime();
    });

    queryBuilder.on('query-error', (err) => {
      logger.error(`message:${err.message}`);
    });

    queryBuilder.on('query-response', (response, query) => {
      const diff = process.hrtime(startAt);
      const ms = (diff[0] * 1e3) + (diff[1] * 1e-6);
      const bindings = query.bindings.map((b) => {
        if (typeof b === 'string') return b.replace(/\r?\n/g, ' ');
        return b;
      }).join(', ');
      logger.info(`message:${query.sql} [${bindings}]\tms:${ms.toFixed(3)}`);
    });

    // queryBuilder.on('end', () => {
    //   // do something
    // });
  });
};
