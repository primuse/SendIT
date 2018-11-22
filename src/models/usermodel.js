/**
* @fileOverview Model with queries for database manipulation.
* @exports userModel
* @requires moment
* @requires DB
*/

import bcrypt from 'bcrypt';
import moment from 'moment';
import dotenv from 'dotenv';
import DB from './DB';
import Helper from '../helper/authPassword';

dotenv.config();

class userModel {
/**
* Method to create new parcel by inserting into DB
* @method
* @param {obj} req HTTP request
*/
  static createUser(firstName, lastName, otherNames, username, email, password) {
    return new Promise((resolve, reject) => {
      const querytext = `INSERT INTO
      userTable(firstName, lastName, otherNames, username, email, registered, isAdmin, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

      const hashedPassword = bcrypt.hashSync(password, 8);
      const values = [
        firstName,
        lastName,
        otherNames,
        username,
        email,
        moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        'false',
        hashedPassword,
      ];

      DB.query(querytext, values).then((result) => {
        const user = result.rows[0];
        const { id, isadmin } = user;
        Helper.getToken({ id, isadmin }, process.env.secret, { expiresIn: '7d' }).then((token) => {
          resolve([{ token, user }]);
        }).catch((err) => {
          reject(err);
        });
      }).catch((error) => {
        if (error.code === '23505') {
          const response = {
            error: 'Email or Username already in use',
          };
          reject(response);
        }
        reject(error);
      });
    });
  }

  static loginUser(email, password) {
    return new Promise((resolve, reject) => {
      const findOneQuery = `SELECT * FROM userTable WHERE email = '${email}'`;
      DB.query(findOneQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'Authentication failed. User not found',
          };
          reject(response);
        }
        Helper.comparePassword(password, result.rows[0].password).then(() => {
          const user = result.rows[0];
          const { id, isadmin } = user;
          Helper.getToken({ id, isadmin }, process.env.secret, { expiresIn: '7d' }).then((token) => {
            resolve([{ token, user }]);
          }).catch((err) => {
            reject(err);
          });
        }).catch((error) => {
          reject(error);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static updateUser(id, value) {
    return new Promise((resolve, reject) => {
      const updateQuery = `UPDATE userTable SET isadmin = '${value}' WHERE id = '${id}' returning *`;
      DB.query(updateQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No user found',
          };
          reject(response);
        }
        resolve(result.rows);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
export default userModel;
