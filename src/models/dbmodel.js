/**
* @fileOverview Model with queries for database manipulation.
* @exports dbModel
* @requires moment
* @requires bcrypt
* @requires DB
*/
import moment from 'moment';
import bcrypt from 'bcrypt';
import DB from './DB';
import Notification from '../helper/email';
import Helper from '../helper/authPassword';

/**
* Creates a new dbModel Class.
* @class
* @classdesc database model class with query methods
*/
class dbModel {
  /**
  * Method to create new parcel by inserting into DB
  * @method
  * @param {string} parcelName
  * @param {integer} weight
  * @param {string} pickupLocation
  * @param {string} destination
  * @param {string} receiver
  * @param {string} email
  * @param {integer} phoneNumber
  * @param {integer} userId
  * @returns {function}
  */
  static createParcel(parcelName, weight, pickupLocation, destination, receiver,
    email, phoneNumber, userId) {
    return new Promise((resolve, reject) => {
      const querytext = `INSERT INTO
      parcelTable(parcelName, placedBy, price, weight, metric,
      pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, sentOn)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      returning *`;
      const values = [
        parcelName,
        userId,
        Number(weight) * 200,
        weight,
        'kg',
        pickupLocation,
        destination,
        'Created',
        receiver,
        email,
        phoneNumber,
        pickupLocation,
        moment(new Date()).format('DD-MM-YYYY'),
      ];

      DB.query(querytext, values).then((result) => {
        resolve(result.rows[0]);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to get all parcels from DB
  * @method
  * @param {int} offset database offset
  * @returns {function}
  */
  static getAllParcels(offset) {
    return new Promise((resolve, reject) => {
      const dbOffset = offset * 6;
      const countAllQuery = 'SELECT COUNT(id) from parcelTable';
      const findAllQuery = `SELECT * FROM parcelTable ORDER BY id ASC LIMIT 6 OFFSET '${dbOffset}'`;

      DB.query(countAllQuery);

      DB.query(findAllQuery);

      Promise.all([
        DB.query(countAllQuery),
        DB.query(findAllQuery)
      ])
        .then((res) => {
          const firstPromise = res[0].rows[0].count,
            secondPromise = res[1].rows,
            pages = Math.ceil(firstPromise / 6);

          secondPromise.pages = pages;

          if (secondPromise.length === 0) {
            const response = {
              message: 'No parcel orders',
            };
            reject(response);
          }

          resolve(secondPromise);
        }).catch((err) => {
          reject(err);
        });
    });
  }

  /**
  * Method to get a parcels from DB
  * @method
  * @param {integer} id
  * @param {integer} userId
  * @param {integer} role
  * @returns {function}
  */
  static findParcel(id, userId, role) {
    return new Promise((resolve, reject) => {
      let findOneQuery = `SELECT * FROM parcelTable WHERE id = '${id}' AND placedby = '${userId}'`;
      if (role) {
        findOneQuery = `SELECT * FROM parcelTable WHERE id = '${id}'`;
        DB.query(findOneQuery).then((result) => {
          if (result.rows.length === 0) {
            const response = {
              message: 'No parcel Found',
            };
            reject(response);
          }
          resolve(result.rows);
        }).catch((error) => {
          reject(error);
        });
      } else {
        DB.query(findOneQuery).then((result) => {
          if (result.rows.length === 0) {
            const response = {
              message: 'No Parcel Found',
            };
            reject(response);
          }
          resolve(result.rows);
        }).catch((error) => {
          reject(error);
        });
      }
    });
  }

  /**
  * Method to cancel parcel in DB
  * @method
  * @param {integer} id
  * @param {integer} userId
  * @returns {function}
  */
  static cancelParcel(id, userId) {
    return new Promise((resolve, reject) => {
      const status = 'Canceled';
      const cancelQuery = `UPDATE parcelTable SET status = '${status}' WHERE id = '${id}' returning *`;

      this.findParcel(id, userId).then((parcel) => {
        const { parcelStatus } = parcel[0];
        if (parcelStatus === 'Canceled' || parcelStatus === 'Delivered') {
          const response = {
            message: 'Parcel already delivered or canceled',
          };
          reject(response);
        } else {
          DB.query(cancelQuery).then((results) => {
            if (results.rows.length === 0) {
              const response = {
                message: 'No parcel found',
              };
              reject(response);
            }
            resolve(results.rows);
          }).catch((error) => {
            reject(error);
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Method to change parcel destination in DB
  * @method
  * @param {integer} id
  * @param {string} value
  * @param {integer} userId
  * @returns {function}
  */
  static changeDestination(id, value, userId) {
    return new Promise((resolve, reject) => {
      const updateQuery = `UPDATE parcelTable SET destination = '${value}' WHERE id = '${id}' returning *`;

      this.findParcel(id, userId).then((parcel) => {
        const { status } = parcel[0];
        if (status === 'Canceled' || status === 'Delivered') {
          const response = {
            message: 'Parcel already delivered or canceled',
          };
          reject(response);
        } else {
          DB.query(updateQuery).then((results) => {
            if (results.rows.length === 0) {
              const response = {
                message: 'No parcel found or already delivered',
              };
              reject(response);
            }
            resolve(results.rows[0]);
          }).catch((error) => {
            reject(error);
          });
        }
      }).catch((err) => {
        reject(err);
      });
    });
  }

  /**
  * Method to change parcel location in DB
  * @method
  * @param {integer} id
  * @param {string} value
  * @returns {function}
  */
  static changeLocation(id, value) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      const updateQuery = `UPDATE parcelTable SET currentLocation = '${value}' WHERE id = '${id}' AND status <> '${exception}' returning *`;

      DB.query(updateQuery).then((result) => {
        const { length } = result.rows;
        let status = null;
        status = length === 0 ? status = null : result.rows[0].status;

        if (length === 0 || status === 'Canceled') {
          const response = {
            message: 'No parcel found, already delivered or canceled',
          };
          reject(response);
        }
        resolve(result.rows[0]);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to change parcel status in DB
  * @method
  * @param {integer} id
  * @param {string} value
  * @returns {function}
  */
  static changeStatus(id, value) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      let updateQuery = null;
      const today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      if (value.toLowerCase() === 'delivered') {
        updateQuery = `UPDATE parcelTable SET status = '${value}', deliveredon = '${today}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      } else {
        updateQuery = `UPDATE parcelTable SET status = '${value}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      }
      DB.query(updateQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel found or Already delivered',
          };
          reject(response);
        }
        const { placedby } = result.rows[0];
        const emailBody = `Your Parcel status has been changed to ${value} <br><br> The SendIT Team`;
        Notification.sendMail(emailBody, placedby).then(() => {
          resolve(result.rows[0]);
        }).catch((err) => {
          reject(err);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to send a reset mail
  * @method
  * @param {string} email
  * @returns {function}
  */
  static sendResetEmail(email) {
    return new Promise((resolve, reject) => {
      const findQuery = `SELECT * FROM userTable WHERE email = '${email}'`;
      DB.query(findQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No account found for this email',
          };
          reject(response);
        }
        const { id, isadmin } = result.rows[0];
        Helper.getToken({ id, isadmin }, process.env.secret, { expiresIn: '1d' }).then((token) => {
          const emailBody = `Click on this link to reset your password <br> <a href="http://127.0.0.1:5500/UI/password_reset.html?id=${id}&auth=${token}">Reset Password</a> <br><br> The SendIT Team`;
          Notification.sendMail(emailBody, id).then(() => {
            resolve(result.rows[0]);
          }).catch((err) => {
            reject(err);
          });
        }).catch((err) => {
          reject(err);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to update a user's password in DB
  * @method
  * @param {integer} id
  * @param {string} password
  * @returns {function}
  */
  static updatePassword(id, password) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const updateQuery = `UPDATE userTable SET password = '${hashedPassword}' WHERE id = '${id}' returning *`;
      DB.query(updateQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'Invalid request',
          };
          reject(response);
        }
        const user = result.rows[0];
        delete user.password;
        delete user.isadmin;
        const emailBody = `Your password has been succesfully changed to: <br> <b>${password}</b> <br><br> The SendIT Team`;
        Notification.sendMail(emailBody, id).then(() => {
          resolve(result.rows[0]);
        }).catch((err) => {
          reject(err);
        });
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
export default dbModel;
