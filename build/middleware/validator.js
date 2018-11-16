"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _validateSchema = require("../helper/validateSchema");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    * Method to validate input before inserting into DB
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
          status: 400,
          data: [{
            message: err.details[0].message
          }]
        });
      });
    }
  }]);

  return ValidateMiddleware;
}();

var _default = ValidateMiddleware;
exports.default = _default;