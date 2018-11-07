"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _ParcelModel = _interopRequireDefault(require("../models/ParcelModel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var model = new _ParcelModel.default(_path.default.join(__dirname, '../files/parcels.json'));

var router = _express.default.Router(); // To get all parcels from User with ID


router.get('/users/:userId/parcels', function (req, res) {
  var id = req.params.userId;
  model.findUserParcel(id).then(function (parcel) {
    res.send({
      parcels: parcel
    });
  }).catch(function (error) {
    console.log(error);
    res.status(404).send({
      Error: error.message
    });
  });
});
var _default = router;
exports.default = _default;