/**
* @fileOverview Middleware methods.
*
* @exports ValidateMiddleware
* @requires Joi
* @requires parcelSchema
* @requires userSchema
* @requires loginSchema
* @requires jwt
* @requires dotenv
*/
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { parcelSchema, userSchema, loginSchema } from '../helper/validateSchema';

dotenv.config();

/**
* Creates a middleware class
* @class
*/
class ValidateMiddleware {
  /**
  * Method to validate parcel input before inserting into DB
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateParcel(req, res, next) {
    Joi.validate(req.body, parcelSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          message: err.details[0].message,
        });
      });
  }

  /**
  * Method to validate user input before inserting into DB
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateUser(req, res, next) {
    Joi.validate(req.body, userSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          message: err.details[0].message,
        });
      });
  }

  /**
  * Method to validate login input
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateLogin(req, res, next) {
    Joi.validate(req.body, loginSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          message: err.details[0].message,
        });
      });
  }

  /**
  * Method to validate token
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded.id;
        next();
      });
    } else {
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
  }
}

export default ValidateMiddleware;
