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
  */
  static createUsers(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    model.createUser(firstName, lastName, email, password).then((data) => {
      res.status(201).send({
        message: 'User Created',
        data,
      });
    }).catch((error) => {
      res.status(400).send({
        message: error,
      });
    });
  }

  /**
  * Handler Method to get all users
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static getAllUsers(req, res) {
    const { offset } = req.query;
    model.getAllUsers(offset).then((rows) => {
      res.send({
        message: 'All Users',
        data: rows,
        pages: rows.pages,
      });
    }).catch((error) => {
      res.status(404)
        .send(error);
    });
  }

  /**
  * Hanlder Method to get a user by ID
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static getUser(req, res) {
    const id = req.params.userId;
    model.findUser(id).then((parcel) => {
      res.send({
        message: `User with ID:${id}`,
        data: parcel,
      });
    }).catch((error) => {
      res.status(404)
        .send(error);
    });
  }

  /**
  * Hanlder Method to login a user by ID
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static loginUser(req, res) {
    const { email, password } = req.body;
    model.loginUser(email, password).then((data) => {
      res.status(200).send({
        message: 'User logged in',
        data,
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }

  /**
  * Hanlder Method to get a upgrade user by ID
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static updateUser(req, res) {
    const id = req.params.userId;
    model.updateUser(id).then((data) => {
      res.status(200).send({
        message: 'User has been successfully upgraded',
        data,
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }

  /**
  * Hanlder Method to get a user by ID
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static downgradeUser(req, res) {
    const id = req.params.userId;
    model.downgradeUser(id).then((data) => {
      res.status(200).send({
        message: 'User has been successfully downgraded',
        data,
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }

  /**
  * Hanlder Method to get a user parcels by ID
  * @method
  * @param  {obj} req The HTTP request
  * @param  {obj} res The HTTP response
  */
  static userParcels(req, res) {
    const { userId } = req.params;
    const { offset } = req.query;
    model.findUserParcels(userId, offset).then((data) => {
      res.status(200).send({
        message: `User ${userId} Parcels`,
        data,
        pages: data.pages
      });
    }).catch((error) => {
      res.status(401).send({
        message: error.message,
      });
    });
  }
}
export default User;
