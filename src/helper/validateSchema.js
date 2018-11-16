/* eslint-disable camelcase */
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
const parcel_name = Joi.string().required();
const placed_by = Joi.number().integer().required();
const price = Joi.number().integer().required();
const weight = Joi.number().integer().required();
const pickup_location = Joi.string().required();
const destination = Joi.string().required();
const status = Joi.string().valid(['Created', 'In-transit', 'Delivered']).required();
const receiver = Joi.string().required();
const email = Joi.string().email().lowercase().required();
const phone_number = Joi.number().integer()
  .required();
const current_location = Joi.string().required();

const first_name = Joi.string().required();
const last_name = Joi.string().required();
const other_names = Joi.string().required();
const username = Joi.string().required();
const password = Joi.string().alphanum().required();

/**
* Creates a new Joi schema.
*/
const parcelSchema = {
  parcel_name,
  placed_by,
  price,
  weight,
  pickup_location,
  destination,
  status,
  receiver,
  email,
  phone_number,
  current_location,
};

/**
* Creates a new Joi schema.
*/
const userSchema = {
  first_name,
  last_name,
  other_names,
  username,
  email,
  password,
};

export { parcelSchema, userSchema };
