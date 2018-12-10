/**
* @fileOverview Model with queries for database manipulation.
* @exports dbModel
* @requires moment
* @requires DB
*/
import moment from 'moment';
import DB from './DB';
import Notification from '../helper/email';

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
  * @param {integer} price
  * @param {integer} weight
  * @param {string} pickupLocation
  * @param {string} destination
  * @param {string} status
  * @param {string} receiver
  * @param {string} email
  * @param {integer} phoneNumber
  * @param {string} currentLocation
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
        moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
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
  * @param {obj} req HTTP request
  * @returns {function}
  */
  static getAllParcels() {
    return new Promise((resolve, reject) => {
      const findAllQuery = 'SELECT * FROM parcelTable';

      DB.query(findAllQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel orders',
          };
          reject(response);
        }
        resolve(result.rows);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to get a parcels from DB
  * @method
  * @param {integer} id
  * @param {integer} userId
  * @returns {function}
  */
  static findParcel(id, userId) {
    return new Promise((resolve, reject) => {
      const findOneQuery = `SELECT * FROM parcelTable WHERE id = '${id}' AND placedby = '${userId}'`;
      DB.query(findOneQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'Unauthorized Access',
          };
          reject(response);
        }
        resolve(result.rows);
      }).catch((error) => {
        reject(error);
      });
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
                message: 'No parcel found or already delivered',
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
            message: 'No parcel found or already delivered',
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
            message: 'No parcel found or already delivered',
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
}
export default dbModel;
