/**
* @fileOverview Model with queries for database manipulation.
* @exports dbModel
* @requires moment
* @requires DB
*/
import moment from 'moment';
import DB from './DB';

/**
* Creates a new dbModel Class.
* @class
* @classdesc database model class with query methods
*/
class dbModel {
  /**
  * Method to create new parcel by inserting into DB
  * @method
  * @param {obj} req HTTP request
  */
  static createParcel(parcelName, price, weight, pickupLocation, destination,
    status, receiver, email, phoneNumber, currentLocation, userId) {
    return new Promise((resolve, reject) => {
      const querytext = `INSERT INTO
      parcelTable(parcelName, placedBy, price, weight, metric,
      pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, sentOn)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      returning *`;
      const values = [
        parcelName,
        userId,
        price,
        weight,
        'kg',
        pickupLocation,
        destination,
        status,
        receiver,
        email,
        phoneNumber,
        currentLocation,
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
  * @param {obj} req HTTP request
  */
  static findParcel(id, userId) {
    return new Promise((resolve, reject) => {
      const findOneQuery = `SELECT * FROM parcelTable WHERE id = '${id}' AND placedby = '${userId}'`;
      DB.query(findOneQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel with given id',
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
  * @param {obj} req HTTP request
  */
  static cancelParcel(id, userId) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      const status = 'Canceled';
      let RealUser = null;
      const findQuery = `SELECT * FROM parcelTable WHERE id = '${id}'`;
      const cancelQuery = `UPDATE parcelTable SET status = '${status}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      DB.query(findQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel found or already delivered',
          };
          reject(response);
        }
        RealUser = result.rows[0].placedby;
        if (RealUser === userId) {
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
        } else {
          const response = {
            message: 'Unauthorized access',
          };
          reject(response);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to change parcel destination in DB
  * @method
  * @param {obj} req HTTP request
  */
  static changeDestination(id, value, userId) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      let RealUser = null;
      const findQuery = `SELECT * FROM parcelTable WHERE id = '${id}'`;
      const updateQuery = `UPDATE parcelTable SET destination = '${value}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      DB.query(findQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel found or already delivered',
          };
          reject(response);
        }
        RealUser = result.rows[0].placedby;
        if (RealUser === userId) {
          DB.query(updateQuery).then((results) => {
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
        } else {
          const response = {
            message: 'Unauthorized access',
          };
          reject(response);
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }

  /**
  * Method to change parcel location in DB
  * @method
  * @param {obj} req HTTP request
  */
  static changeLocation(id, value) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      const updateQuery = `UPDATE parcelTable SET currentLocation = '${value}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      DB.query(updateQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel found or already delivered',
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
  * Method to change parcel status in DB
  * @method
  * @param {obj} req HTTP request
  */
  static changeStatus(id, value) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      const updateQuery = `UPDATE parcelTable SET status = '${value}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      DB.query(updateQuery).then((result) => {
        if (result.rows.length === 0) {
          const response = {
            message: 'No parcel found or already delivered',
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
export default dbModel;
