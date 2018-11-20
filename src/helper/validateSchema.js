/**
* @fileOverview Model with queries for database manipulation.
*
* @exports parcelSchema
* @exports userSchema
* @requires Joi
*/
import Joi from 'joi';

/**
* Joi validation constraints
*/
const parcelName = Joi.string().required();
const price = Joi.number().integer().required();
const weight = Joi.number().integer().required();
const pickupLocation = Joi.string().required();
const destination = Joi.string().required();
const status = Joi.string().valid(['Created', 'In-transit', 'Delivered']).required();
const receiver = Joi.string().required();
const email = Joi.string().email().lowercase().required();
const phoneNumber = Joi.number().integer()
  .required();
const currentLocation = Joi.string().required();

const firstName = Joi.string().required();
const lastName = Joi.string().required();
const otherNames = Joi.string().required();
const username = Joi.string().required();
const password = Joi.string().alphanum().required();

/**
* Creates a new Joi schema.
*/
const parcelSchema = {
  parcelName,
  price,
  weight,
  pickupLocation,
  destination,
  status,
  receiver,
  email,
  phoneNumber,
  currentLocation,
};

/**
* Creates a new Joi schema.
*/
const userSchema = {
  firstName,
  lastName,
  otherNames,
  username,
  email,
  password,
};

const loginSchema = {
  email,
  password,
};

export { parcelSchema, userSchema, loginSchema };
