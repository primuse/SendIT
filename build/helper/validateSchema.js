"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusSchema = exports.locationSchema = exports.updateSchema = exports.loginSchema = exports.userSchema = exports.parcelSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @fileOverview Model with queries for database manipulation.
*
* @exports parcelSchema
* @exports userSchema
* @requires Joi
*/

/**
* Joi validation constraints
*/
var parcelName = _joi.default.string().required();

var price = _joi.default.number().integer().required();

var weight = _joi.default.number().integer().required();

var pickupLocation = _joi.default.string().required();

var destination = _joi.default.string().required();

var status = _joi.default.string().valid(['Created', 'In-transit', 'Delivered', 'Canceled']).required();

var receiver = _joi.default.string().required();

var email = _joi.default.string().email({
  minDomainAtoms: 2
}).lowercase().required();

var phoneNumber = _joi.default.number().integer().required();

var currentLocation = _joi.default.string().required();

var firstName = _joi.default.string().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid firstname'));

var lastName = _joi.default.string().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid lastname'));

var otherNames = _joi.default.string().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid name'));

var username = _joi.default.string().alphanum().required().error(new Error('Enter a valid username'));

var password = _joi.default.string().alphanum().required().error(new Error('Enter a valid password'));
/**
* Creates a new Joi schema.
*/


var parcelSchema = {
  parcelName: parcelName,
  price: price,
  weight: weight,
  pickupLocation: pickupLocation,
  destination: destination,
  status: status,
  receiver: receiver,
  email: email,
  phoneNumber: phoneNumber,
  currentLocation: currentLocation
};
/**
* Creates a new Joi schema.
*/

exports.parcelSchema = parcelSchema;
var userSchema = {
  firstName: firstName,
  lastName: lastName,
  otherNames: otherNames,
  username: username,
  email: email,
  password: password
};
exports.userSchema = userSchema;
var loginSchema = {
  email: email,
  password: password
};
exports.loginSchema = loginSchema;
var updateSchema = {
  destination: destination
};
exports.updateSchema = updateSchema;
var locationSchema = {
  currentLocation: currentLocation
};
exports.locationSchema = locationSchema;
var statusSchema = {
  status: status
};
exports.statusSchema = statusSchema;