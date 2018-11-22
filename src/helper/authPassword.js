import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
* @class
* @classdesc helper class with handler methods
*/
class Helper {
  /**
  * Handler Method to compare password
  * @method
  * @param  {integer} inputPassword
  * @param  {integer} dbPassword
  * @returns {function}
  */
  static comparePassword(inputPassword, dbPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(inputPassword, dbPassword).then((res) => {
        if (res) {
          resolve();
        } else {
          const response = {
            message: 'Invalid email or password',
          };
          reject(response);
        }
      });
    });
  }

  /**
  * Handler Method to compare password
  * @method
  * @param  {obj} payload
  * @param  {string} secret
  * @param {string} expires
  * @returns {function}
  */
  static getToken(payload, secret, expires) {
    return new Promise((resolve, reject) => {
      const res = jwt.sign(payload, secret, expires);
      if (res) {
        resolve(res);
      } else {
        const response = {
          message: 'Invalid email or password',
        };
        reject(response);
      }
    });
  }
}
export default Helper;
