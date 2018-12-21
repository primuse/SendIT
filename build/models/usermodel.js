"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _moment = _interopRequireDefault(require("moment"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _DB = _interopRequireDefault(require("./DB"));

var _authPassword = _interopRequireDefault(require("../helper/authPassword"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();
/**
* @class
* @classdesc User model class with handler methods
*/


var userModel =
/*#__PURE__*/
function () {
  function userModel() {
    _classCallCheck(this, userModel);
  }

  _createClass(userModel, null, [{
    key: "createUser",

    /**
    * Method to create new parcel by inserting into DB
    * @method
    * @param {string} firstName
    * @param {string} lastName
    * @param {string} otherNames
    * @param {string} username
    * @param {string} email
    * @param {string} password
    * @returns {function}
    */
    value: function createUser(firstName, lastName, otherNames, username, email, password) {
      return new Promise(function (resolve, reject) {
        var querytext = "INSERT INTO\n      userTable(firstName, lastName, otherNames, username, email, registered, isAdmin, password)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8)\n      returning *";

        var hashedPassword = _bcrypt.default.hashSync(password, 8);

        var values = [firstName, lastName, otherNames, username, email, (0, _moment.default)(new Date()).format('YYYY-MM-DD HH:mm:ss'), 'false', hashedPassword];

        _DB.default.query(querytext, values).then(function (result) {
          var user = result.rows[0];
          var id = user.id,
              isadmin = user.isadmin;

          _authPassword.default.getToken({
            id: id,
            isadmin: isadmin
          }, process.env.secret, {
            expiresIn: '7d'
          }).then(function (token) {
            resolve([{
              token: token,
              user: user
            }]);
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function (error) {
          if (error.code === '23505') {
            var response = {
              error: 'Email or Username already in use'
            };
            reject(response);
          }

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

  }, {
    key: "getAllUsers",
    value: function getAllUsers() {
      return new Promise(function (resolve, reject) {
        var findAllQuery = 'SELECT * FROM userTable';

        _DB.default.query(findAllQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'No Users'
            };
            reject(response);
          }

          resolve(result.rows);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
    /**
    * Method to get a users from DB
    * @method
    * @param {integer} id
    * @returns {function}
    */

  }, {
    key: "findUser",
    value: function findUser(id) {
      return new Promise(function (resolve, reject) {
        var findOneQuery = "SELECT * FROM userTable WHERE id = '".concat(id, "'");

        _DB.default.query(findOneQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'No User with given id'
            };
            reject(response);
          }

          resolve(result.rows);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
    /**
    * Method to get a users from DB
    * @method
    * @param {string} email
    * @param {string} password
    * @returns {function}
    */

  }, {
    key: "loginUser",
    value: function loginUser(email, password) {
      return new Promise(function (resolve, reject) {
        var findOneQuery = "SELECT * FROM userTable WHERE email = '".concat(email, "'");

        _DB.default.query(findOneQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'Authentication failed. User not found'
            };
            reject(response);
          }

          _authPassword.default.comparePassword(password, result.rows[0].password).then(function () {
            var user = result.rows[0];
            var id = user.id,
                isadmin = user.isadmin;

            _authPassword.default.getToken({
              id: id,
              isadmin: isadmin
            }, process.env.secret, {
              expiresIn: '7d'
            }).then(function (token) {
              resolve([{
                token: token,
                user: user
              }]);
            }).catch(function (err) {
              reject(err);
            });
          }).catch(function (error) {
            reject(error);
          });
        }).catch(function (error) {
          reject(error);
        });
      });
    }
    /**
    * Method to get a users from DB
    * @method
    * @param {integer} id
    * @param {string} value
    * @returns {function}
    */

  }, {
    key: "updateUser",
    value: function updateUser(id, value) {
      return new Promise(function (resolve, reject) {
        var updateQuery = "UPDATE userTable SET isadmin = '".concat(value, "' WHERE id = '").concat(id, "' returning *");

        _DB.default.query(updateQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'No user found'
            };
            reject(response);
          }

          resolve(result.rows);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
    /**
    * Method to get a users from DB
    * @method
    * @param {integer} userId
    * @returns {function}
    */

  }, {
    key: "findUserParcels",
    value: function findUserParcels(userId) {
      return new Promise(function (resolve, reject) {
        var findQuery = "SELECT * FROM parcelTable WHERE placedby = '".concat(userId, "'");

        _DB.default.query(findQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'User has no parcels'
            };
            reject(response);
          }

          resolve(result.rows);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return userModel;
}();

var _default = userModel;
exports.default = _default;