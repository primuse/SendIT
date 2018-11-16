"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _DB = _interopRequireDefault(require("./DB"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
    * @param {obj} req HTTP request
    */
    value: function () {
      var _createParcel = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req) {
        var querytext, values, _ref, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                querytext = "INSERT INTO\n      parcel_table(parcel_name, placed_by, price, weight, metric,\n      pickup_location, destination, status, receiver, email,phone_number, current_location, sent_on, delivered_on)\n      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)\n      returning *";
                values = [req.body.parcel_name, req.body.placed_by, req.body.price, req.body.weight, 'kg', req.body.pickup_location, req.body.destination, req.body.status, req.body.receiver, req.body.email, req.body.phone_number, req.body.current_location, (0, _moment.default)(new Date()), (0, _moment.default)(new Date())];
                _context.prev = 2;
                _context.next = 5;
                return _DB.default.query(querytext, values);

              case 5:
                _ref = _context.sent;
                rows = _ref.rows;
                return _context.abrupt("return", rows[0]);

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", _context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      return function createParcel(_x) {
        return _createParcel.apply(this, arguments);
      };
    }()
  }]);

  return dbModel;
}();

var _default = dbModel;
exports.default = _default;