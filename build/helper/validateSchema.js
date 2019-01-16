"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordSchema = exports.resetSchema = exports.statusSchema = exports.locationSchema = exports.updateSchema = exports.loginSchema = exports.userSchema = exports.parcelSchema = void 0;

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
var parcelName = _joi.default.string().trim().required();

var weight = _joi.default.number().integer().required();

var pickupLocation = _joi.default.string().trim().required();

var destination = _joi.default.string().trim().required();

var status = _joi.default.string().trim().valid(['Created', 'In-transit', 'Delivered', 'Canceled']).required();

var receiver = _joi.default.string().trim().required();

var email = _joi.default.string().trim().email({
  minDomainAtoms: 2
}).lowercase().required().error(new Error('Enter a valid email'));

var phoneNumber = _joi.default.number().integer().required();

var currentLocation = _joi.default.string().trim().required();

var firstName = _joi.default.string().trim().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid firstname'));

var lastName = _joi.default.string().trim().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid lastname'));

var password = _joi.default.string().alphanum().trim().required().error(new Error('Enter a valid password'));
/**
* Creates a new Joi schema.
*/


var parcelSchema = {
  parcelName: parcelName,
  weight: weight,
  pickupLocation: pickupLocation,
  destination: destination,
  receiver: receiver,
  email: email,
  phoneNumber: phoneNumber
};
/**
* Creates a new Joi schema.
*/

exports.parcelSchema = parcelSchema;
var userSchema = {
  firstName: firstName,
  lastName: lastName,
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
var resetSchema = {
  email: email
};
exports.resetSchema = resetSchema;
var locationSchema = {
  currentLocation: currentLocation
};
exports.locationSchema = locationSchema;
var statusSchema = {
  status: status
};
exports.statusSchema = statusSchema;
var passwordSchema = {
  password: password
};
exports.passwordSchema = passwordSchema;