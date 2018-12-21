"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* @class
* @classdesc helper class with handler methods
*/
var Helper =
/*#__PURE__*/
function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: "comparePassword",

    /**
    * Handler Method to compare password
    * @method
    * @param  {integer} inputPassword
    * @param  {integer} dbPassword
    * @returns {function}
    */
    value: function comparePassword(inputPassword, dbPassword) {
      return new Promise(function (resolve, reject) {
        _bcrypt.default.compare(inputPassword, dbPassword).then(function (res) {
          if (res) {
            resolve();
          } else {
            var response = {
              message: 'Invalid email or password'
            };
            reject(response);
          }
        });
      });
    }
    /**
    * Handler Method to compare password
    * @method
    * @param  {obj} payload
    * @param  {string} secret
    * @param {string} expires
    * @returns {function}
    */

  }, {
    key: "getToken",
    value: function getToken(payload, secret, expires) {
      return new Promise(function (resolve, reject) {
        var res = _jsonwebtoken.default.sign(payload, secret, expires);

        if (res) {
          resolve(res);
        } else {
          var response = {
            message: 'Invalid email or password'
          };
          reject(response);
        }
      });
    }
  }]);

  return Helper;
}();

var _default = Helper;
exports.default = _default;