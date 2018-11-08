"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _ParcelController = _interopRequireDefault(require("../controllers/ParcelController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router(); // To create new parcels


router.post('/parcels', _ParcelController.default.createParcels); // To get all parcel delivery orders

router.get('/parcels', _ParcelController.default.getAllParcels); // To get a parcel delivery order with ID

router.get('/parcels/:parcelId', _ParcelController.default.getParcel); // To update a parcel with ID

router.put('/parcels/:parcelId/update', _ParcelController.default.updateParcel); // To cancel a Parcel with ID

router.put('/parcels/:parcelId/cancel', _ParcelController.default.cancelParcel);
var _default = router;
exports.default = _default;