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
import Notification from '../helper/email';

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
  * @param {string} email
  * @param {string} password
  * @returns {function}
  */
  static createUser(firstName, lastName, email, password) {
    return new Promise((resolve, reject) => {
      const querytext = `INSERT INTO
      userTable(firstName, lastName, email, registered, isAdmin, password)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;

      const hashedPassword = bcrypt.hashSync(password, 8);
      const values = [
        firstName,
        lastName,
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
            error: 'Email already Registered',
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
  * @param {int} offset database offset
  * @returns {function}
  */
  static getAllUsers(offset) {
    return new Promise((resolve, reject) => {
      const dbOffset = offset * 8;
      const countAllQuery = 'SELECT COUNT(id) from userTable';
      const findAllQuery = `SELECT * FROM userTable ORDER BY id ASC LIMIT 8 OFFSET '${dbOffset}'`;

      DB.query(countAllQuery);

      DB.query(findAllQuery);

      Promise.all([
        DB.query(countAllQuery),
        DB.query(findAllQuery)
      ])
        .then((res) => {
          const firstPromise = res[0].rows[0].count,
            users = res[1].rows,
            pages = Math.ceil(firstPromise / 8);

          users.pages = pages;

          if (users.length === 0) {
            const response = {
              message: 'No Users',
            };
            reject(response);
          }
          users.map(user => delete user.password);
          resolve(users);
        }).catch((err) => {
          reject(err);
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
        delete user.isadmin;
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
          if (user.isadmin) {
            user.auth = 0;
          }
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
  static updateUser(id) {
    return new Promise((resolve, reject) => {
      if (+id === 1) {
        const response = {
          message: 'Cannot Upgrade Super Admin'
        };
        reject(response);
      } else {
        const updateQuery = `UPDATE userTable SET isadmin = 'true' WHERE id = '${id}' AND isadmin = 'false' returning *`;
        DB.query(updateQuery).then((result) => {
          if (result.rows.length === 0) {
            const response = {
              message: 'Already Upgraded',
            };
            reject(response);
          }
          const user = result.rows[0];
          delete user.password;
          delete user.isadmin;
          const emailBody = 'You have been successfully upgraded to Admin <br><br> The SendIT Team';
          Notification.sendMail(emailBody, id).then(() => {
            resolve(result.rows[0]);
          }).catch((err) => {
            reject(err);
          });
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  /**
  * Method to downgrade an admin to user from DB
  * @method
  * @param {integer} id
  * @param {string} value
  * @returns {function}
  */
  static downgradeUser(id) {
    return new Promise((resolve, reject) => {
      if (+id === 1) {
        const response = {
          message: 'Cannot Downgrade Super Admin'
        };
        reject(response);
      } else {
        const updateQuery = `UPDATE userTable SET isadmin = 'false' WHERE id = '${id}' AND isadmin = 'true' returning *`;
        DB.query(updateQuery).then((result) => {
          if (result.rows.length === 0) {
            const response = {
              message: 'Already Downgraded',
            };
            reject(response);
          }
          const user = result.rows[0];
          delete user.password;
          delete user.isadmin;
          const emailBody = 'You have been successfully downgraded from Admin. <br> All Admin Priviledges have been revoked <br><br> The SendIT Team';
          Notification.sendMail(emailBody, id).then(() => {
            resolve(result.rows[0]);
          }).catch((err) => {
            reject(err);
          });
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  /**
  * Method to get a users parcel from DB
  * @method
  * @param {integer} userId
  * @param {integer} offset
  * @returns {function}
  */
  static findUserParcels(userId, offset) {
    return new Promise((resolve, reject) => {
      const dbOffset = offset * 6;
      const countAllQuery = `SELECT COUNT(id) from parcelTable WHERE placedby = '${userId}'`;
      const findQuery = `SELECT * FROM parcelTable WHERE placedby = '${userId}' ORDER BY id ASC LIMIT 6 OFFSET '${dbOffset}'`;
      DB.query(countAllQuery);

      DB.query(findQuery);

      Promise.all([
        DB.query(countAllQuery),
        DB.query(findQuery)
      ])
        .then((res) => {
          const firstPromise = res[0].rows[0].count,
            secondPromise = res[1].rows,
            pages = Math.ceil(firstPromise / 6);

          secondPromise.pages = pages;

          if (secondPromise.length === 0) {
            const response = {
              message: 'User has no parcels',
            };
            resolve(response);
          }
          resolve(secondPromise);
        }).catch((err) => {
          reject(err);
        });
    });
  }
}
export default userModel;
