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
  constructor() {
    this.maxTimes = 3;
    this.interval = 100; // ms
    this.debug = false;
  }

  /**
   * @public
   */
  setMaxTimes(count) {
    this.maxTimes = count;
    return this;
  }

  /**
   * @public
   */
  setInterval(ms) {
    this.interval = ms;
    return this;
  }

  /**
   * @public
   */
  setDebug(flag) {
    this.debug = flag;
    return this;
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
    fn(retryCount)
      .then(function applyPromise() {
        // Don't use arrow function.
        // In that case, `arguments` will be global scope variable.
        resolve.apply(Promise, arguments);
      })
      .catch((err) => {
        if (retryCount >= maxTimes) {
          reject(err);
        } else {
          setTimeout(() => {
            const nextCount = retryCount + 1;
            this.log(nextCount, err);
            this.doRetry(fn, nextCount, resolve, reject);
          }, this.interval);
        }
      });
  }

  /**
   * @private
   */
  log(retryCount, err) {
    if (this.debug) {
      const hrtime = process.hrtime();
      console.log(
        'retry cnt: %d, at: %d.%d, prev_err: %s',
        retryCount,
        hrtime[0],
        hrtime[1],
        err.message
      );
    }
  }
}

module.exports = () => new Retry();
