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
import {
  parcelSchema, userSchema, loginSchema, updateSchema, locationSchema, statusSchema,
} from '../helper/validateSchema';

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
          message: err.details[0].message.replace(/['"']/gi, ''),
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
          error: err.message,
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
          message: err.message,
        });
      });
  }

  /**
  * Method to validate destination input
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateDestination(req, res, next) {
    Joi.validate(req.body, updateSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, ''),
        });
      });
  }

  /**
  * Method to validate location input
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateLocation(req, res, next) {
    Joi.validate(req.body, locationSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, ''),
        });
      });
  }

  /**
  * Method to validate status input
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  */
  static validateStatus(req, res, next) {
    Joi.validate(req.body, statusSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, ''),
        });
      });
  }

  /**
  * Method to validate token
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  * @returns {function}
  */
  static validateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded.id;
        req.role = decoded.isadmin;
        next();
      });
    } else {
      return res.status(403).send({ message: 'No token provided.' });
    }
  }

  /**
  * Method to validate token
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  * @returns {function}
  */
  static validateUsers(req, res, next) {
    const token = req.headers['x-access-token'];
    const { userId } = req.params;
    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          return res.status(500).send({ message: 'Failed to authenticate token.' });
        }
        req.decoded = decoded.id;
        req.role = decoded.isadmin;
        if (+userId === +req.decoded) {
          next();
        } else {
          return res.status(403).send({ message: 'Unauthorized access' });
        }
      });
    } else {
      return res.status(403).send({ message: 'No token provided.' });
    }
  }

  /**
  * Method to validate user role
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  * @returns {function}
  */
  static validateUserRole(req, res, next) {
    if (req.role === true) {
      next();
    } else {
      return res.status(403).send({ message: 'Unauthorized access' });
    }
  }

  /**
  * Method to validate parcel Parameter
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  * @returns {function}
  */
  static validateParcelParam(req, res, next) {
    const parcelId = Number(req.params.parcelId);
    if (isNaN(parcelId)) {
      return res.status(404).send({ message: 'Page not found' });
    }
    next();
  }

  /**
  * Method to validate parcel Parameter
  * @method
  * @param {obj} req HTTP request
  * @param {obj} res HTTP response
  * @param {obj} next points to the next function down the line
  * @returns {function}
  */
  static validateUserParam(req, res, next) {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      return res.status(404).send({ message: 'Page not Found' });
    }
    next();
  }
}

export default ValidateMiddleware;
