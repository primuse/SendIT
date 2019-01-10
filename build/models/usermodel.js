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

var _email = _interopRequireDefault(require("../helper/email"));

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
    * Method to create new user by inserting into DB
    * @method
    * @param {string} firstName
    * @param {string} lastName
    * @param {string} email
    * @param {string} password
    * @returns {function}
    */
    value: function createUser(firstName, lastName, email, password) {
      return new Promise(function (resolve, reject) {
        var querytext = "INSERT INTO\n      userTable(firstName, lastName, email, registered, isAdmin, password)\n      VALUES($1, $2, $3, $4, $5, $6)\n      returning *";

        var hashedPassword = _bcrypt.default.hashSync(password, 8);

        var values = [firstName, lastName, email, (0, _moment.default)(new Date()).format('YYYY-MM-DD HH:mm:ss'), 'false', hashedPassword];

        _DB.default.query(querytext, values).then(function (result) {
          var user = result.rows[0];
          delete user.password;
          var id = user.id,
              isadmin = user.isadmin;

          _authPassword.default.getToken({
            id: id,
            isadmin: isadmin
          }, process.env.secret, {
            expiresIn: '7d'
          }).then(function (token) {
            resolve({
              token: token,
              user: user
            });
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function (error) {
          if (error.code === '23505') {
            var response = {
              error: 'Email already Registered'
            };
            reject(response);
          } else {
            reject(error);
          }
        });
      });
    }
    /**
    * Method to get all users from DB
    * @method
    * @param {int} offset database offset
    * @returns {function}
    */

  }, {
    key: "getAllUsers",
    value: function getAllUsers(offset) {
      return new Promise(function (resolve, reject) {
        var dbOffset = offset * 8;
        var countAllQuery = 'SELECT COUNT(id) from userTable';
        var findAllQuery = "SELECT * FROM userTable ORDER BY id ASC LIMIT 8 OFFSET '".concat(dbOffset, "'");

        _DB.default.query(countAllQuery);

        _DB.default.query(findAllQuery);

        Promise.all([_DB.default.query(countAllQuery), _DB.default.query(findAllQuery)]).then(function (res) {
          var firstPromise = res[0].rows[0].count,
              users = res[1].rows,
              pages = Math.ceil(firstPromise / 8);
          users.pages = pages;

          if (users.length === 0) {
            var response = {
              message: 'No Users'
            };
            reject(response);
          }

          users.map(function (user) {
            return delete user.password;
          });
          resolve(users);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
    /**
    * Method to get a user from DB
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

          var user = result.rows[0];
          delete user.password;
          delete user.isadmin;
          resolve(user);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
    /**
    * Method to login a user from DB
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
            delete user.password;

            if (user.isadmin) {
              user.auth = 0;
            }

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
    * Method to update a user to admin from DB
    * @method
    * @param {integer} id
    * @param {string} value
    * @returns {function}
    */

  }, {
    key: "updateUser",
    value: function updateUser(id) {
      return new Promise(function (resolve, reject) {
        if (+id === 1) {
          var response = {
            message: 'Cannot Upgrade Super Admin'
          };
          reject(response);
        } else {
          var updateQuery = "UPDATE userTable SET isadmin = 'true' WHERE id = '".concat(id, "' AND isadmin = 'false' returning *");

          _DB.default.query(updateQuery).then(function (result) {
            if (result.rows.length === 0) {
              var _response = {
                message: 'Already Upgraded'
              };
              reject(_response);
            }

            var user = result.rows[0];
            delete user.password;
            delete user.isadmin;
            var emailBody = 'You have been successfully upgraded to Admin <br><br> The SendIT Team';

            _email.default.sendMail(emailBody, id).then(function () {
              resolve(result.rows[0]);
            }).catch(function (err) {
              reject(err);
            });
          }).catch(function (error) {
            reject(error);
          });
        }
      });
    }
    /**
    * Method to downgrade an admin to user from DB
    * @method
    * @param {integer} id
    * @param {string} value
    * @returns {function}
    */

  }, {
    key: "downgradeUser",
    value: function downgradeUser(id) {
      return new Promise(function (resolve, reject) {
        if (+id === 1) {
          var response = {
            message: 'Cannot Downgrade Super Admin'
          };
          reject(response);
        } else {
          var updateQuery = "UPDATE userTable SET isadmin = 'false' WHERE id = '".concat(id, "' AND isadmin = 'true' returning *");

          _DB.default.query(updateQuery).then(function (result) {
            if (result.rows.length === 0) {
              var _response2 = {
                message: 'Already Downgraded'
              };
              reject(_response2);
            }

            var user = result.rows[0];
            delete user.password;
            delete user.isadmin;
            var emailBody = 'You have been successfully downgraded from Admin. <br> All Admin Priviledges have been revoked <br><br> The SendIT Team';

            _email.default.sendMail(emailBody, id).then(function () {
              resolve(result.rows[0]);
            }).catch(function (err) {
              reject(err);
            });
          }).catch(function (error) {
            reject(error);
          });
        }
      });
    }
    /**
    * Method to get a users parcel from DB
    * @method
    * @param {integer} userId
    * @param {integer} offset
    * @returns {function}
    */

  }, {
    key: "findUserParcels",
    value: function findUserParcels(userId, offset) {
      return new Promise(function (resolve, reject) {
        var dbOffset = offset * 6;
        var countAllQuery = "SELECT COUNT(id) from parcelTable WHERE placedby = '".concat(userId, "'");
        var findQuery = "SELECT * FROM parcelTable WHERE placedby = '".concat(userId, "' ORDER BY id ASC LIMIT 6 OFFSET '").concat(dbOffset, "'");

        _DB.default.query(countAllQuery);

        _DB.default.query(findQuery);

        Promise.all([_DB.default.query(countAllQuery), _DB.default.query(findQuery)]).then(function (res) {
          var firstPromise = res[0].rows[0].count,
              secondPromise = res[1].rows,
              pages = Math.ceil(firstPromise / 6);
          secondPromise.pages = pages;

          if (secondPromise.length === 0) {
            var response = {
              message: 'User has no parcel'
            };
            resolve(response);
          }

          resolve(secondPromise);
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }]);

  return userModel;
}();

var _default = userModel;
exports.default = _default;