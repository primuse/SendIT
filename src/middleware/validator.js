import Joi from 'joi';
import { parcelSchema, userSchema } from '../helper/validateSchema';

class ValidateMiddleware {
  static validateParcel(req, res, next) {
    Joi.validate(req.body, parcelSchema)
      .then(() => next())
      .catch((err) => {
        res.status(400).send({
          status: 400,
          data: [{
            message: err.details[0].message,
          }],
        });
      });
  }
}

export default ValidateMiddleware;
