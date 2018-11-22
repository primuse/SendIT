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
const status = Joi.string().valid(['Created', 'In-transit', 'Delivered', 'Canceled']).required();
const receiver = Joi.string().required();
const email = Joi.string().email({ minDomainAtoms: 2 }).lowercase().required();
const phoneNumber = Joi.number().integer()
  .required();
const currentLocation = Joi.string().required();

const firstName = Joi.string().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid firstname'));
const lastName = Joi.string().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid lastname'));
const otherNames = Joi.string().regex(/^[a-zA-Z]*$/).required().error(new Error('Enter a valid name'));
const username = Joi.string().alphanum().required().error(new Error('Enter a valid username'));
const password = Joi.string().alphanum().required().error(new Error('Enter a valid password'));

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

const updateSchema = {
  destination,
};

const locationSchema = {
  currentLocation,
};

const statusSchema = {
  status,
};


export {
  parcelSchema, userSchema, loginSchema, updateSchema, locationSchema, statusSchema,
};
