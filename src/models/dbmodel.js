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
      pickup_location, destination, status, receiver, email,phone_number, current_location, sent_on, delivered_on)
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
}
export default dbModel;
