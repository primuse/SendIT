/**
* @fileOverview Model with queries for database manipulation.
*
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
      parcel_table(parcel_name, placed_by, price, weight, metric,
      pickup_location, destination, status, receiver, email, phone_number, current_location, sent_on, delivered_on)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      returning *`;
    const values = [
      req.body.parcel_name,
      req.body.placed_by,
      req.body.price,
      req.body.weight,
      'kg',
      req.body.pickup_location,
      req.body.destination,
      req.body.status,
      req.body.receiver,
      req.body.email,
      req.body.phone_number,
      req.body.current_location,
      moment(new Date()),
      moment(new Date()),
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
      const findAllQuery = 'SELECT * FROM parcel_table';

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
      const findOneQuery = `SELECT * FROM parcel_table WHERE id = '${id}'`;
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
      const cancelQuery = `UPDATE parcel_table SET status = '${status}' WHERE id = '${id}' AND status <> '${exception}' returning *`;
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
