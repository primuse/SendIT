/**
* @fileOverview Middleware methods.
*
* @exports ValidateMiddleware
* @requires Joi
* @requires parcelSchema
* @requires userSchema
*/
import Joi from 'joi';
import { parcelSchema } from '../helper/validateSchema';

/**
* Creates a middleware class
* @class
*/
class ValidateMiddleware {
  /**
  * Method to validate input before inserting into DB
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
}

export default ValidateMiddleware;
