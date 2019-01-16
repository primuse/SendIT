"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _usermodel = _interopRequireDefault(require("../models/usermodel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var model = _usermodel.default;
/**
* @class
* @classdesc User class with handler methods
*/

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "createUsers",

    /**
    * Handler Method to create new Users
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */
    value: function createUsers(req, res) {
      var _req$body = req.body,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          email = _req$body.email,
          password = _req$body.password;
      model.createUser(firstName, lastName, email, password).then(function (data) {
        res.status(201).send({
          message: 'User Created',
          data: data
        });
      }).catch(function (error) {
        res.status(400).send({
          message: error
        });
      });
    }
    /**
    * Handler Method to get all users
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      var offset = req.query.offset;
      model.getAllUsers(offset).then(function (rows) {
        res.send({
          message: 'All Users',
          data: rows,
          pages: rows.pages
        });
      }).catch(function (error) {
        res.status(404).send(error);
      });
    }
    /**
    * Hanlder Method to get a user by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "getUser",
    value: function getUser(req, res) {
      var id = req.params.userId;
      model.findUser(id).then(function (parcel) {
        res.send({
          message: "User with ID:".concat(id),
          data: parcel
        });
      }).catch(function (error) {
        res.status(404).send(error);
      });
    }
    /**
    * Hanlder Method to login a user by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "loginUser",
    value: function loginUser(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      model.loginUser(email, password).then(function (data) {
        res.status(200).send({
          message: 'User logged in',
          data: data
        });
      }).catch(function (error) {
        res.status(401).send({
          message: error.message
        });
      });
    }
    /**
    * Hanlder Method to get a upgrade user by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "updateUser",
    value: function updateUser(req, res) {
      var id = req.params.userId;
      model.updateUser(id).then(function (data) {
        res.status(200).send({
          message: 'User has been successfully upgraded',
          data: data
        });
      }).catch(function (error) {
        res.status(401).send({
          message: error.message
        });
      });
    }
    /**
    * Hanlder Method to get a user by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "downgradeUser",
    value: function downgradeUser(req, res) {
      var id = req.params.userId;
      model.downgradeUser(id).then(function (data) {
        res.status(200).send({
          message: 'User has been successfully downgraded',
          data: data
        });
      }).catch(function (error) {
        res.status(401).send({
          message: error.message
        });
      });
    }
    /**
    * Hanlder Method to get a user parcels by ID
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "userParcels",
    value: function userParcels(req, res) {
      var userId = req.params.userId;
      var offset = req.query.offset;
      model.findUserParcels(userId, offset).then(function (data) {
        res.status(200).send({
          message: "User ".concat(userId, " Parcels"),
          data: data,
          pages: data.pages
        });
      }).catch(function (error) {
        res.status(401).send({
          message: error.message
        });
      });
    }
  }]);

  return User;
}();

var _default = User;
exports.default = _default;