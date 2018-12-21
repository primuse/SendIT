"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _DB = _interopRequireDefault(require("./DB"));

var _email = _interopRequireDefault(require("../helper/email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Creates a new dbModel Class.
* @class
* @classdesc database model class with query methods
*/
var dbModel =
/*#__PURE__*/
function () {
  function dbModel() {
    _classCallCheck(this, dbModel);
  }

  _createClass(dbModel, null, [{
    key: "createParcel",

    /**
    * Method to create new parcel by inserting into DB
    * @method
    * @param {string} parcelName
    * @param {integer} price
    * @param {integer} weight
    * @param {string} pickupLocation
    * @param {string} destination
    * @param {string} status
    * @param {string} receiver
    * @param {string} email
    * @param {integer} phoneNumber
    * @param {string} currentLocation
    * @param {integer} userId
    * @returns {function}
    */
    value: function createParcel(parcelName, price, weight, pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, userId) {
      return new Promise(function (resolve, reject) {
        var querytext = "INSERT INTO\n      parcelTable(parcelName, placedBy, price, weight, metric,\n      pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, sentOn)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)\n      returning *";
        var values = [parcelName, userId, price, weight, 'kg', pickupLocation, destination, status, receiver, email, phoneNumber, currentLocation, (0, _moment.default)(new Date()).format('YYYY-MM-DD HH:mm:ss')];

        _DB.default.query(querytext, values).then(function (result) {
          resolve(result.rows[0]);
        }).catch(function (error) {
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
    key: "getAllParcels",
    value: function getAllParcels() {
      return new Promise(function (resolve, reject) {
        var findAllQuery = 'SELECT * FROM parcelTable';

        _DB.default.query(findAllQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'No parcel orders'
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
    * Method to get a parcels from DB
    * @method
    * @param {integer} id
    * @param {integer} userId
    * @returns {function}
    */

  }, {
    key: "findParcel",
    value: function findParcel(id, userId) {
      return new Promise(function (resolve, reject) {
        var findOneQuery = "SELECT * FROM parcelTable WHERE id = '".concat(id, "' AND placedby = '").concat(userId, "'");

        _DB.default.query(findOneQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'No parcel with given id'
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
    * Method to cancel parcel in DB
    * @method
    * @param {integer} id
    * @param {integer} userId
    * @returns {function}
    */

  }, {
    key: "cancelParcel",
    value: function cancelParcel(id, userId) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var status = 'Canceled';
        var cancelQuery = "UPDATE parcelTable SET status = '".concat(status, "' WHERE id = '").concat(id, "' returning *");

        _this.findParcel(id, userId).then(function (parcel) {
          var parcelStatus = parcel[0].parcelStatus;

          if (parcelStatus === 'Canceled' || parcelStatus === 'Delivered') {
            var response = {
              message: 'Parcel already delivered or canceled'
            };
            reject(response);
          } else {
            _DB.default.query(cancelQuery).then(function (results) {
              if (results.rows.length === 0) {
                var _response = {
                  message: 'No parcel found or already delivered'
                };
                reject(_response);
              }

              resolve(results.rows);
            }).catch(function (error) {
              reject(error);
            });
          }
        }).catch(function (err) {
          reject(err);
        });
      });
    }
    /**
    * Method to change parcel destination in DB
    * @method
    * @param {integer} id
    * @param {string} value
    * @param {integer} userId
    * @returns {function}
    */

  }, {
    key: "changeDestination",
    value: function changeDestination(id, value, userId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var updateQuery = "UPDATE parcelTable SET destination = '".concat(value, "' WHERE id = '").concat(id, "' returning *");

        _this2.findParcel(id, userId).then(function (parcel) {
          var status = parcel[0].status;

          if (status === 'Canceled' || status === 'Delivered') {
            var response = {
              message: 'Parcel already delivered or canceled'
            };
            reject(response);
          } else {
            _DB.default.query(updateQuery).then(function (results) {
              if (results.rows.length === 0) {
                var _response2 = {
                  message: 'No parcel found or already delivered'
                };
                reject(_response2);
              }

              resolve(results.rows);
            }).catch(function (error) {
              reject(error);
            });
          }
        }).catch(function (err) {
          reject(err);
        });
      });
    }
    /**
    * Method to change parcel location in DB
    * @method
    * @param {integer} id
    * @param {string} value
    * @returns {function}
    */

  }, {
    key: "changeLocation",
    value: function changeLocation(id, value) {
      return new Promise(function (resolve, reject) {
        var exception = 'Delivered';
        var updateQuery = "UPDATE parcelTable SET currentLocation = '".concat(value, "' WHERE id = '").concat(id, "' AND status <> '").concat(exception, "' returning *");

        _DB.default.query(updateQuery).then(function (result) {
          var length = result.rows.length;
          var status = null;
          status = length === 0 ? status = null : result.rows[0].status;

          if (length === 0 || status === 'Canceled') {
            var response = {
              message: 'No parcel found or already delivered'
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
    * Method to change parcel status in DB
    * @method
    * @param {integer} id
    * @param {string} value
    * @returns {function}
    */

  }, {
    key: "changeStatus",
    value: function changeStatus(id, value) {
      return new Promise(function (resolve, reject) {
        var exception = 'Delivered';
        var updateQuery = null;
        var today = (0, _moment.default)(new Date()).format('YYYY-MM-DD HH:mm:ss');

        if (value.toLowerCase() === 'delivered') {
          updateQuery = "UPDATE parcelTable SET status = '".concat(value, "', deliveredon = '").concat(today, "' WHERE id = '").concat(id, "' AND status <> '").concat(exception, "' returning *");
        } else {
          updateQuery = "UPDATE parcelTable SET status = '".concat(value, "' WHERE id = '").concat(id, "' AND status <> '").concat(exception, "' returning *");
        }

        _DB.default.query(updateQuery).then(function (result) {
          if (result.rows.length === 0) {
            var response = {
              message: 'No parcel found or already delivered'
            };
            reject(response);
          }

          var placedby = result.rows[0].placedby;
          var emailBody = "Your Parcel status has been changed to ".concat(value);

          _email.default.sendMail(emailBody, placedby).then(function () {
            resolve(result.rows);
          }).catch(function (err) {
            reject(err);
          });
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return dbModel;
}();

var _default = dbModel;
exports.default = _default;