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

/**
* @class
* @classdesc User model class with handler methods
*/
class userModel {
  /**
  * Method to create new user by inserting into DB
  * @method
  * @param {string} firstName
  * @param {string} lastName
  * @param {string} otherNames
  * @param {string} username
  * @param {string} email
  * @param {string} password
  * @returns {function}
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
        delete user.password;
        const { id, isadmin } = user;
        Helper.getToken({ id, isadmin }, process.env.secret, { expiresIn: '7d' }).then((token) => {
          resolve({ token, user });
        }).catch((err) => {
          reject(err);
        });
      }).catch((error) => {
        if (error.code === '23505') {
          const response = {
            error: 'Email or Username already in use',
          };
          reject(response);
        } else {
          reject(error);
        }
      });
    });
  }

  /**
  * Method to get all users from DB
  * @method
  * @param {obj} req HTTP request
  * @returns {function}
  */
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      const findAllQuery = 'SELECT * FROM userTable';

      DB.query(findAllQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No Users',
          };
          reject(response);
        }
        const users = result.rows;
        users.map(user => delete user.password);
        resolve(users);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to get a user from DB
  * @method
  * @param {integer} id
  * @returns {function}
  */
  static findUser(id) {
    return new Promise((resolve, reject) => {
      const findOneQuery = `SELECT * FROM userTable WHERE id = '${id}'`;
      DB.query(findOneQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No User with given id',
          };
          reject(response);
        }
        const user = result.rows[0];
        delete user.password;
        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to login a user from DB
  * @method
  * @param {string} email
  * @param {string} password
  * @returns {function}
  */
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
          delete user.password;
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

  /**
  * Method to update a user to admin from DB
  * @method
  * @param {integer} id
  * @param {string} value
  * @returns {function}
  */
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
        const user = result.rows[0];
        delete user.password;
        resolve(result.rows);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to get a users parcel from DB
  * @method
  * @param {integer} userId
  * @returns {function}
  */
  static findUserParcels(userId) {
    return new Promise((resolve, reject) => {
      const findQuery = `SELECT * FROM parcelTable WHERE placedby = '${userId}'`;
      DB.query(findQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'User has no parcels',
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
