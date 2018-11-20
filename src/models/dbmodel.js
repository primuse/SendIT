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
  static async createParcel(req) {
    const querytext = `INSERT INTO
      parcelTable(parcelName, placedBy, price, weight, metric,
      pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, sentOn)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      returning *`;

    const {
      parcelName, placedBy, price, weight, pickupLocation, destination,
      status, receiver, email, phoneNumber, currentLocation,
    } = req.body;

    const values = [
      parcelName,
      placedBy,
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

    try {
      const { rows } = await DB.query(querytext, values);
      return rows[0];
    } catch (error) {
      return error;
    }
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
  static findParcel(id) {
    return new Promise((resolve, reject) => {
      const findOneQuery = `SELECT * FROM parcelTable WHERE id = '${id}'`;
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
  static cancelParcel(id) {
    return new Promise((resolve, reject) => {
      const exception = 'Delivered';
      const status = 'Canceled';
      const cancelQuery = `UPDATE parcelTable SET status = '${status}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
      DB.query(cancelQuery).then((result) => {
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
