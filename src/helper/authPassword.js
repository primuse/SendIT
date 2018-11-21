import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Helper {
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
