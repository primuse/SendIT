/**
* @fileOverview Controller reusable module with user route handler methods.
*
* @exports User
* @requires userModel
*/

import userModel from '../models/usermodel';

const model = userModel;

/**
* @class
* @classdesc User class with handler methods
*/
class User {
  /**
  * Handler Method to create new Users
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  * @returns {obj}
  */
  static createUsers(req, res) {
    const {
      firstName, lastName, otherNames, username, email, password,
    } = req.body;
    model.createUser(firstName, lastName, otherNames, username, email, password).then((data) => {
      res.status(201).send({
        data,
      });
    }).catch((error) => {
      res.status(400).send({
        message: error,
      });
    });
  }

  static loginUser(req, res) {
    const { email, password } = req.body;
    model.loginUser(email, password).then((data) => {
      res.status(200).send({
        data,
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }

  static updateUser(req, res) {
    const id = req.params.userId;
    const value = req.body.isadmin;
    model.updateUser(id, value).then((data) => {
      res.status(200).send({
        data,
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }
}
export default User;
