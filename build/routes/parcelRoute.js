"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbParcelController = _interopRequireDefault(require("../controllers/dbParcelController"));

var _validator = _interopRequireDefault(require("../middleware/validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* @fileOverview Parcel Route module
*
* @exports router
* @requires express
* @requires ParcelController
* @requires ValidateMiddleware
*/
var router = _express.default.Router();
/**
* Route to create new Parcel Orders
* @param  {string} route The Post url route
* @param  {function} ParcelController.createParcels The handler method
* @returns {(obj|obj} success message or error message
*/


router.post('/parcels', _validator.default.validateToken, _validator.default.validateParcel, _dbParcelController.default.createParcels);
/**
* Route to get all Parcel Orders
* @param  {string} route The Get Parcels url route
* @param  {function} ParcelController.getAllParcels The handler function
* @returns {(obj|obj} parcel or error message
*/

router.get('/parcels', _validator.default.validateToken, _validator.default.validateUserRole, _dbParcelController.default.getAllParcels);
/**
* Route to get parcel order by ID
* @param  {string} route The Get parcels/:parcelID url route
* @param  {function} ParcelController.getParcel The handler function
* @returns {(obj|obj} parcel or error message
*/

router.get('/parcels/:parcelId', _validator.default.validateToken, _dbParcelController.default.getParcel);
/**
* Route to cancel a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.cancelParcel The handler function
* @returns {(obj|obj} success message or error message
*/

router.patch('/parcels/:parcelId/cancel', _validator.default.validateToken, _dbParcelController.default.cancelParcel);
/**
* Route to change a parcel destination
* @param  {string} route The cancel url route
* @param  {function} ParcelController.updateParcel The handler function
* @returns {(obj|obj} success message or error message
*/

router.patch('/parcels/:parcelId/destination', _validator.default.validateToken, _validator.default.validateDestination, _dbParcelController.default.updateParcel);
/**
* Route to change currentLocation of a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.locationParcel The handler function
* @returns {(obj|obj} success message or error message
*/

router.patch('/parcels/:parcelId/currentlocation', _validator.default.validateToken, _validator.default.validateUserRole, _validator.default.validateLocation, _dbParcelController.default.locationParcel);
/**
* Route to change status of a parcel order
* @param  {string} route The cancel url route
* @param  {function} ParcelController.locationParcel The handler function
* @returns {(obj|obj} success message or error message
*/

router.patch('/parcels/:parcelId/status', _validator.default.validateToken, _validator.default.validateUserRole, _validator.default.validateStatus, _dbParcelController.default.statusParcel);
var _default = router;
exports.default = _default;