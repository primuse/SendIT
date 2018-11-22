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

var sgMail = require('@sendgrid/mail');

var dotenv = require('dotenv');

dotenv.config();
/**
* @class
* @classdesc Notification class for email
*/

var Notification =
/*#__PURE__*/
function () {
  function Notification() {
    _classCallCheck(this, Notification);
  }

  _createClass(Notification, null, [{
    key: "sendMail",

    /**
    * Handler Method to create new Parcels
    * @method
    * @param  {string} emailBody
    * @param  {string} userId
    * @param  {string} email
    * @returns {function}
    */
    value: function sendMail(emailBody, userId) {
      return new Promise(function (resolve, reject) {
        _usermodel.default.findUser(userId).then(function (user) {
          var _user$ = user[0],
              email = _user$.email,
              firstname = _user$.firstname;
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          var msg = {
            to: email,
            from: 'Send-IT <primuse51@gmail.com>',
            subject: "Hi ".concat(firstname),
            html: emailBody
          };
          sgMail.send(msg);
          resolve();
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return Notification;
}();

var _default = Notification;
exports.default = _default;