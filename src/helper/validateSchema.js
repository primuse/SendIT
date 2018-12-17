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
const parcelName = Joi.string().trim().required();
const weight = Joi.number().integer().required();
const pickupLocation = Joi.string().trim().required();
const destination = Joi.string().trim().required();
const status = Joi.string().trim().valid(['Created', 'In-transit', 'Delivered', 'Canceled']).required();
const receiver = Joi.string().trim().required();
const email = Joi.string().trim().email({ minDomainAtoms: 2 }).lowercase()
  .required()
  .error(new Error('Enter a valid email'));
const phoneNumber = Joi.number().integer()
  .required();
const currentLocation = Joi.string().trim().required();

const firstName = Joi.string().trim().regex(/^[a-zA-Z]*$/).required()
  .error(new Error('Enter a valid firstname'));
const lastName = Joi.string().trim().regex(/^[a-zA-Z]*$/).required()
  .error(new Error('Enter a valid lastname'));
const password = Joi.string().alphanum().trim().required()
  .error(new Error('Enter a valid password'));

/**
* Creates a new Joi schema.
*/
const parcelSchema = {
  parcelName,
  weight,
  pickupLocation,
  destination,
  receiver,
  email,
  phoneNumber,
};

/**
* Creates a new Joi schema.
*/
const userSchema = {
  firstName,
  lastName,
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

const resetSchema = {
  email,
};

const locationSchema = {
  currentLocation,
};

const statusSchema = {
  status,
};

const passwordSchema = {
  password,
};


export {
  parcelSchema, userSchema, loginSchema, updateSchema, locationSchema, statusSchema, resetSchema,
  passwordSchema,
};
