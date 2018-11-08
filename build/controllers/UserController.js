"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _ParcelModel = _interopRequireDefault(require("../models/ParcelModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var model = new _ParcelModel.default(_path.default.join(__dirname, '../files/parcels.json'));

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "getUserParcel",
    // To get all parcels from user with ID
    value: function getUserParcel(req, res) {
      var id = req.params.userId;
      model.findUserParcel(id).then(function (parcel) {
        res.send(parcel);
      }).catch(function (error) {
        console.log(error);
        res.status(404).send({
          Error: error
        });
      });
    }
  }]);

  return User;
}();

var _default = User;
exports.default = _default;