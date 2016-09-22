'use strict';

/**
 * Usage:
 * <pre>
 *   Retry()
 *     .debug(true)
 *     .maxTimes(5)
 *     .interval(20)
 *     .execute((count) => {
 *       return doSomething();
 *     })
 *     .then((result) => { ... })
 *     .catch((err) => { ... });
 * </pre>
 */

class Retry {
  constructor(option) {
    this.maxTimes = option.maxTimes || 3;
    this.interval = option.interval || 100; // ms
    this.logger = option.logger || null;
    this.isRetryableError = option.isRetryableError || function is() { return true; };
  }

  /**
   * @public
   */
  execute(fn) {
    const retryCount = 0;
    return new Promise((resolve, reject) => {
      this.doRetry(fn, retryCount, resolve, reject);
    });
  }

  /**
   * @private
   */
  doRetry(fn, retryCount, resolve, reject) {
    const maxTimes = this.maxTimes;
    const isRetryableError = this.isRetryableError;
    fn(retryCount)
      .then(function applyPromise() {
        // Don't use arrow function.
        // In that case, `arguments` will be global scope variable.
        resolve.apply(Promise, arguments);
      })
      .catch((err) => {
        if (retryCount >= maxTimes) {
          return reject(err);
        }

        if (!isRetryableError(err)) {
          return reject(err);
        }

        return setTimeout(() => {
          const nextCount = retryCount + 1;
          this.log(nextCount, err);
          this.doRetry(fn, nextCount, resolve, reject);
        }, this.interval);
      });
  }

  /**
   * @private
   */
  log(retryCount, err) {
    if (this.logger) {
      this.logger.warn(`retry:${retryCount}\tmessage:${err.message}`);
    }
  }
}

module.exports = (option) => new Retry(option);
