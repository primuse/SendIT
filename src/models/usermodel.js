/**
* @fileOverview Model with queries for database manipulation.
* @exports userModel
* @requires moment
* @requires DB
*/

import bcrypt from 'bcrypt';
import moment from 'moment';
import DB from './DB';

class userModel {
/**
* Method to create new parcel by inserting into DB
* @method
* @param {obj} req HTTP request
*/
  static async createUser(req) {
    const querytext = `INSERT INTO
      userTable(firstName, lastName, otherNames, username, email, registered, isAdmin, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;

    const {
      firstName, lastName, otherNames, username, email, password,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const values = [
      firstName,
      lastName,
      otherNames,
      username,
      email,
      moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      'False',
      hashedPassword,
    ];

    try {
      const { rows } = await DB.query(querytext, values);
      return rows[0];
    } catch (error) {
      return error;
    }
  }
}
export default userModel;
