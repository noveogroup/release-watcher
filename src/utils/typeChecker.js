/**
 * @param value
 * @returns {boolean}
 */
export function isObject (value) {
  return value instanceof Object && value.constructor === Object
}
/**
 * @param value
 * @returns {boolean}
 */
export function isArray (value) {
  return Array.isArray(value)
}
/**
 * @param value
 * @returns {boolean}
 */
export function isString (value) {
  return typeof value === 'string'
}
/**
 * @param value
 * @returns {boolean}
 */
export function isNumber (value) {
  return typeof value === 'number'
}
/**
 * @param value
 * @returns {boolean}
 */
export function isBoolean (value) {
  return typeof value === 'boolean'
}
/**
 * @param value
 * @returns {boolean}
 */
export function isUndefined (value) {
  return typeof value === 'undefined'
}
/**
 * @param value
 * @returns {boolean}
 */
export function isFunction (value) {
  return typeof value === 'function'
}
/**
 * @param value
 * @returns {boolean}
 */
export function isNull (value) {
  return value === null
}
/**
 * @param value
 * @returns {boolean}
 */
export function isDate (value) {
  return value instanceof Date
}
