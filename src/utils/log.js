import { isString } from 'lodash'

/**
 * Higher order functional wrapper for the other log methods
 *
 * @param function  $fn         Console.log method
 * @param string    $message    Message to log
 *
 * @returns function
 */

/* istanbul ignore next */
const logWrapper = fn => /* istanbul ignore next */ message => {
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'test') {
    return fn(message)
  }
}

/* istanbul ignore next */
export const log = /* istanbul ignore next */ message => {
  /* istanbul ignore next */
  return logWrapper(console.log, message)
}

/* istanbul ignore next */
export const warn = /* istanbul ignore next */ message => {
  /* istanbul ignore next */
  return logWrapper(console.warn, message)
}

/* istanbul ignore next */
export const error = /* istanbul ignore next */ message => {
  /* istanbul ignore next */
  return logWrapper(console.error, message)
}

/* istanbul ignore next */
export const Exception = (methodName, message) => {
  /* istanbul ignore next */
  if (!isString(methodName) || !isString(message)) {
    warn('helix: Exception(): Arguments need to be strings.')
  }
  /* istanbul ignore next */
  this.message = `helix: ${methodName}(): ${message}`
}
