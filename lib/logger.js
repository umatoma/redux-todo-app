'use strict';

const log4js = require('log4js');

log4js.configure({
  appenders: [
    {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: 'date:%d{ISO8601}\tlevel:%p\t%m'
      }
    }
  ]
});

module.exports.getLogger = log4js.getLogger;
