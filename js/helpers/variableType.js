"use strict";

exports.__esModule = true;
exports.isString = isString;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isEmptyObject = isEmptyObject;
<<<<<<< HEAD
=======
exports.isNull = isNull;
exports.isUndefined = isUndefined;
>>>>>>> a04d3daefc401b1317288b55a229defb806e4eef
exports.isValue = isValue;

/**
 * @param {any} variable
 * @returns {boolean}
 */
function isString(variable) {
  return typeof variable === 'string' || variable instanceof String;
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isNumber(variable) {
  return typeof variable === 'number' || variable instanceof Number;
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isBoolean(variable) {
  return typeof variable === 'boolean';
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isArray(variable) {
  return Array.isArray(variable);
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isFunction(variable) {
  return typeof variable === 'function';
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isObject(variable) {
<<<<<<< HEAD
  return variable !== null && !isArray(variable) && !isString(variable) && !isNumber(variable) && typeof variable === 'object';
=======
  return !isNull(variable) && !isArray(variable) && !isString(variable) && !isNumber(variable) && typeof variable === 'object';
>>>>>>> a04d3daefc401b1317288b55a229defb806e4eef
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isEmptyObject(variable) {
  return isObject(variable) && Object.keys(variable).length === 0;
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


<<<<<<< HEAD
function isValue(variable) {
  return variable !== undefined && variable !== null;
=======
function isNull(variable) {
  return variable === null;
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isUndefined(variable) {
  return variable === undefined;
}
/**
 * @param {any} variable
 * @returns {boolean}
 */


function isValue(variable) {
  return !isUndefined(variable) && !isNull(variable);
>>>>>>> a04d3daefc401b1317288b55a229defb806e4eef
}