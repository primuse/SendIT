"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSchema = exports.parcelSchema = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

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
var parcel_name = _joi.default.string().required();

var placed_by = _joi.default.number().integer().required();

var price = _joi.default.number().integer().required();

var weight = _joi.default.number().integer().required();

var pickup_location = _joi.default.string().required();

var destination = _joi.default.string().required();

var status = _joi.default.string().valid(['Created', 'In-transit', 'Delivered']).required();

var receiver = _joi.default.string().required();

var email = _joi.default.string().email().lowercase().required();

var phone_number = _joi.default.number().integer().required();

var current_location = _joi.default.string().required();

var first_name = _joi.default.string().required();

var last_name = _joi.default.string().required();

var other_names = _joi.default.string().required();

var username = _joi.default.string().required();

var password = _joi.default.string().alphanum().required();
/**
* Creates a new Joi schema.
*/


var parcelSchema = {
  parcel_name: parcel_name,
  placed_by: placed_by,
  price: price,
  weight: weight,
  pickup_location: pickup_location,
  destination: destination,
  status: status,
  receiver: receiver,
  email: email,
  phone_number: phone_number,
  current_location: current_location
};
/**
* Creates a new Joi schema.
*/

exports.parcelSchema = parcelSchema;
var userSchema = {
  first_name: first_name,
  last_name: last_name,
  other_names: other_names,
  username: username,
  email: email,
  password: password
};
exports.userSchema = userSchema;