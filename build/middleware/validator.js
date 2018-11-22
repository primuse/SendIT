"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _validateSchema = require("../helper/validateSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();
/**
* Creates a middleware class
* @class
*/


var ValidateMiddleware =
/*#__PURE__*/
function () {
  function ValidateMiddleware() {
    _classCallCheck(this, ValidateMiddleware);
  }

  _createClass(ValidateMiddleware, null, [{
    key: "validateParcel",

    /**
    * Method to validate parcel input before inserting into DB
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    */
    value: function validateParcel(req, res, next) {
      _joi.default.validate(req.body, _validateSchema.parcelSchema).then(function () {
        return next();
      }).catch(function (err) {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, '')
        });
      });
    }
    /**
    * Method to validate user input before inserting into DB
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    */

  }, {
    key: "validateUser",
    value: function validateUser(req, res, next) {
      _joi.default.validate(req.body, _validateSchema.userSchema).then(function () {
        return next();
      }).catch(function (err) {
        res.status(400).send({
          error: err.message
        });
      });
    }
    /**
    * Method to validate login input
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    */

  }, {
    key: "validateLogin",
    value: function validateLogin(req, res, next) {
      _joi.default.validate(req.body, _validateSchema.loginSchema).then(function () {
        return next();
      }).catch(function (err) {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, '')
        });
      });
    }
    /**
    * Method to validate destination input
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    */

  }, {
    key: "validateDestination",
    value: function validateDestination(req, res, next) {
      _joi.default.validate(req.body, _validateSchema.updateSchema).then(function () {
        return next();
      }).catch(function (err) {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, '')
        });
      });
    }
    /**
    * Method to validate location input
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    */

  }, {
    key: "validateLocation",
    value: function validateLocation(req, res, next) {
      _joi.default.validate(req.body, _validateSchema.locationSchema).then(function () {
        return next();
      }).catch(function (err) {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, '')
        });
      });
    }
    /**
    * Method to validate status input
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    */

  }, {
    key: "validateStatus",
    value: function validateStatus(req, res, next) {
      _joi.default.validate(req.body, _validateSchema.statusSchema).then(function () {
        return next();
      }).catch(function (err) {
        res.status(400).send({
          message: err.details[0].message.replace(/['"']/gi, '')
        });
      });
    }
    /**
    * Method to validate token
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    * @returns {function}
    */

  }, {
    key: "validateToken",
    value: function validateToken(req, res, next) {
      var token = req.headers['x-access-token'];

      if (token) {
        _jsonwebtoken.default.verify(token, process.env.secret, function (err, decoded) {
          if (err) {
            return res.status(500).send({
              auth: false,
              message: 'Failed to authenticate token.'
            });
          }

          req.decoded = decoded.id;
          req.role = decoded.isadmin;
          next();
        });
      } else {
        return res.status(403).send({
          auth: false,
          message: 'No token provided.'
        });
      }
    }
    /**
    * Method to validate token
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    * @returns {function}
    */

  }, {
    key: "validateUsers",
    value: function validateUsers(req, res, next) {
      var token = req.headers['x-access-token'];
      var userId = req.params.userId;

      if (token) {
        _jsonwebtoken.default.verify(token, process.env.secret, function (err, decoded) {
          if (err) {
            return res.status(500).send({
              auth: false,
              message: 'Failed to authenticate token.'
            });
          }

          req.decoded = decoded.id;
          req.role = decoded.isadmin;

          if (+userId === +req.decoded) {
            next();
          } else {
            return res.status(403).send({
              auth: false,
              message: 'Unauthorized access'
            });
          }
        });
      } else {
        return res.status(403).send({
          auth: false,
          message: 'No token provided.'
        });
      }
    }
    /**
    * Method to validate user role
    * @method
    * @param {obj} req HTTP request
    * @param {obj} res HTTP response
    * @param {obj} next points to the next function down the line
    * @returns {function}
    */

  }, {
    key: "validateUserRole",
    value: function validateUserRole(req, res, next) {
      if (req.role === true) {
        next();
      } else {
        return res.status(403).send({
          auth: false,
          message: 'Unauthorized access'
        });
      }
    }
  }]);

  return ValidateMiddleware;
}();

var _default = ValidateMiddleware;
exports.default = _default;