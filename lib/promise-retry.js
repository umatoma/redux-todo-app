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
    this._maxTimes = 3;
    this._interval = 100; // ms
    this._debug = false;
  }

  /**
   * @public
   */
  maxTimes(count) {
    this._maxTimes = count;
    return this;
  }

  /**
   * @public
   */
  interval(ms) {
    this._interval = ms;
    return this;
  }

  /**
   * @public
   */
  debug(flag) {
    this._debug = flag;
    return this;
  }

  /**
   * @public
   */
  execute(fn) {
    let retryCount = 0;
    let maxTimes = this._maxTimes;
    return new Promise((resolve, reject) => {
      this.doRetry(fn, retryCount, resolve, reject);
    });
  }

  /**
   * @private
   */
  doRetry(fn, retryCount, resolve, reject) {
    let maxTimes = this._maxTimes;
    fn(retryCount)
      .then(function() {
        // Don't use arrow function.
        // In that case, `arguments` will be global scope variable.
        resolve.apply(Promise, arguments);
      })
      .catch((err) => {
        if (retryCount >= maxTimes) {
          reject(err);
        } else {
          setTimeout(() => {
            retryCount++;
            this.log(retryCount, err);
            this.doRetry(fn, retryCount, resolve, reject);
          }, this._interval);
        }
      });
  }

  /**
   * @private
   */
  log(retryCount, err) {
    if (this._debug) {
      let hrtime = process.hrtime();
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
