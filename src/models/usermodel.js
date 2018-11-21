/**
* @fileOverview Model with queries for database manipulation.
* @exports userModel
* @requires moment
* @requires DB
*/

import bcrypt from 'bcrypt';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import DB from './DB';

dotenv.config();

class userModel {
/**
* Method to create new parcel by inserting into DB
* @method
* @param {obj} req HTTP request
*/
  static createUser(req) {
    return new Promise((resolve, reject) => {
      const querytext = `INSERT INTO
      userTable(firstName, lastName, otherNames, username, email, registered, isAdmin, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

      const {
        firstName, lastName, otherNames, username, email, password, isAdmin,
      } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 8);

      const values = [
        firstName,
        lastName,
        otherNames,
        username,
        email,
        moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        isAdmin,
        hashedPassword,
      ];

      DB.query(querytext, values).then((result) => {
        resolve(result.rows);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static loginUser(req) {
    return new Promise((resolve, reject) => {
      const { email, password } = req.body;
      const findOneQuery = `SELECT * FROM userTable WHERE email = '${email}'`;
      DB.query(findOneQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'Authentication failed. User not found',
          };
          reject(response);
        }
        bcrypt.compare(password, result.rows[0].password).then((res) => {
          if (res) {
            const user = result.rows[0];
            const payload = {
              user: result.rows[0].firstName,
              id: user.id,
              role: result.rows[0].isAdmin,
            };
            const token = jwt.sign(payload, process.env.secret, { expiresIn: '1h' });
            resolve([{ token, user }]);
          }
          const response = {
            message: 'Invalid Password',
          };
          reject(response);
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
export default userModel;
