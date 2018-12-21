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
          otherNames = _req$body.otherNames,
          username = _req$body.username,
          email = _req$body.email,
          password = _req$body.password;
      model.createUser(firstName, lastName, otherNames, username, email, password).then(function (data) {
        res.status(201).send({
          data: data
        });
      }).catch(function (error) {
        res.status(400).send({
          message: error
        });
      });
    }
    /**
    * Handler Method to get all Parcel orders
    * @method
    * @param  {obj} req The HTTP request
    * @param  {obj} res The HTTP response
    */

  }, {
    key: "getAllUsers",
    value: function getAllUsers(req, res) {
      model.getAllUsers().then(function (rows) {
        res.send({
          data: rows
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
          data: parcel
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
    key: "loginUser",
    value: function loginUser(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;
      model.loginUser(email, password).then(function (data) {
        res.status(200).send({
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
    key: "updateUser",
    value: function updateUser(req, res) {
      var id = req.params.userId;
      var value = req.body.isadmin;
      model.updateUser(id, value).then(function (data) {
        res.status(200).send({
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
    key: "userParcels",
    value: function userParcels(req, res) {
      var userId = req.params.userId;
      model.findUserParcels(userId).then(function (data) {
        res.status(200).send({
          data: data
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